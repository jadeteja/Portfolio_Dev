package com.jadeteja.portfolio.service;

import com.jadeteja.portfolio.dto.*;
import com.jadeteja.portfolio.entity.*;
import com.jadeteja.portfolio.exception.BadRequestException;
import com.jadeteja.portfolio.exception.ResourceNotFoundException;
import com.jadeteja.portfolio.repository.*;
import com.jadeteja.portfolio.storage.SupabaseStorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    private final ProjectRepository projectRepository;
    private final ProjectImageRepository projectImageRepository;
    private final ServiceRepository serviceRepository;
    private final PricingPlanRepository pricingPlanRepository;
    private final AdditionalChargeRepository additionalChargeRepository;
    private final FaqRepository faqRepository;
    private final InquiryRepository inquiryRepository;
    private final SiteSettingRepository siteSettingRepository;
    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final SupabaseStorageService storageService;

    public AdminService(
            ProjectRepository projectRepository,
            ProjectImageRepository projectImageRepository,
            ServiceRepository serviceRepository,
            PricingPlanRepository pricingPlanRepository,
            AdditionalChargeRepository additionalChargeRepository,
            FaqRepository faqRepository,
            InquiryRepository inquiryRepository,
            SiteSettingRepository siteSettingRepository,
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            SupabaseStorageService storageService) {
        this.projectRepository = projectRepository;
        this.projectImageRepository = projectImageRepository;
        this.serviceRepository = serviceRepository;
        this.pricingPlanRepository = pricingPlanRepository;
        this.additionalChargeRepository = additionalChargeRepository;
        this.faqRepository = faqRepository;
        this.inquiryRepository = inquiryRepository;
        this.siteSettingRepository = siteSettingRepository;
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.storageService = storageService;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        long totalProjects = projectRepository.count();
        long publishedProjects = projectRepository.countByPublishedTrue();
        long totalInquiries = inquiryRepository.count();
        long newInquiries = inquiryRepository.countByStatus("NEW");
        long activeServices = serviceRepository.countByActiveTrue();

        return new DashboardStatsDto(totalProjects, publishedProjects, totalInquiries, newInquiries, activeServices);
    }

    // Projects CRUD
    @Transactional(readOnly = true)
    public List<ProjectDto.Response> getAllProjects() {
        return projectRepository.findAll().stream().map(this::mapProject).collect(Collectors.toList());
    }

    public ProjectDto.Response createProject(ProjectDto.UpsertRequest request) {
        if (projectRepository.findBySlug(request.getSlug()).isPresent()) {
            throw new BadRequestException("Project slug already exists: " + request.getSlug());
        }
        Project project = new Project();
        updateProjectFields(project, request);
        return mapProject(projectRepository.save(project));
    }

    public ProjectDto.Response updateProject(UUID id, ProjectDto.UpsertRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));
        updateProjectFields(project, request);
        return mapProject(projectRepository.save(project));
    }

    public void deleteProject(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));
        projectRepository.delete(project);
    }

    public ProjectDto.ProjectImageDto uploadProjectImage(UUID projectId, MultipartFile file, String altText) throws IOException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + projectId));

        SupabaseStorageService.UploadResult result = storageService.uploadProjectImage(file, projectId);

        ProjectImage image = new ProjectImage();
        image.setProject(project);
        image.setImageUrl(result.publicUrl());
        image.setStoragePath(result.storagePath());
        image.setAltText(altText);
        image.setDisplayOrder(project.getImages().size() + 1);

        ProjectImage saved = projectImageRepository.save(image);

        ProjectDto.ProjectImageDto dto = new ProjectDto.ProjectImageDto();
        dto.setId(saved.getId());
        dto.setImageUrl(saved.getImageUrl());
        dto.setStoragePath(saved.getStoragePath());
        dto.setAltText(saved.getAltText());
        dto.setDisplayOrder(saved.getDisplayOrder());
        return dto;
    }

    public void deleteProjectImage(UUID projectId, UUID imageId) {
        ProjectImage image = projectImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found: " + imageId));
        if (image.getStoragePath() != null) {
            storageService.deleteImage(image.getStoragePath());
        }
        projectImageRepository.delete(image);
    }

    // Services CRUD
    @Transactional(readOnly = true)
    public List<ServiceDto.Response> getAllServices() {
        return serviceRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::mapService)
                .collect(Collectors.toList());
    }

    public ServiceDto.Response createService(ServiceDto.UpsertRequest request) {
        ServiceItem item = new ServiceItem();
        item.setTitle(request.getTitle());
        item.setSlug(request.getSlug());
        item.setDescription(request.getDescription());
        item.setIcon(request.getIcon());
        item.setFeatures(request.getFeatures());
        item.setDisplayOrder(request.getDisplayOrder());
        item.setActive(request.isActive());
        return mapService(serviceRepository.save(item));
    }

    public ServiceDto.Response updateService(UUID id, ServiceDto.UpsertRequest request) {
        ServiceItem item = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + id));
        item.setTitle(request.getTitle());
        item.setSlug(request.getSlug());
        item.setDescription(request.getDescription());
        item.setIcon(request.getIcon());
        item.setFeatures(request.getFeatures());
        item.setDisplayOrder(request.getDisplayOrder());
        item.setActive(request.isActive());
        return mapService(serviceRepository.save(item));
    }

    public void deleteService(UUID id) {
        ServiceItem item = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + id));
        serviceRepository.delete(item);
    }

    // Pricing Plans
    @Transactional(readOnly = true)
    public List<PricingDto.Response> getAllPricingPlans() {
        return pricingPlanRepository.findAll().stream().map(this::mapPricing).collect(Collectors.toList());
    }

    public PricingDto.Response updatePricingPlan(UUID id, PricingDto.UpdateRequest request) {
        PricingPlan plan = pricingPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pricing plan not found: " + id));
        plan.setDevelopmentPrice(request.getDevelopmentPrice());
        plan.setAnnualHostingPrice(request.getAnnualHostingPrice());
        if (request.getHostingRequired() != null) {
            plan.setHostingRequired(request.getHostingRequired());
        }
        if (request.getDescription() != null) {
            plan.setDescription(request.getDescription());
        }
        if (request.getFeatures() != null) {
            plan.setFeatures(request.getFeatures());
        }
        if (request.getActive() != null) {
            plan.setActive(request.getActive());
        }
        return mapPricing(pricingPlanRepository.save(plan));
    }

    // Additional Charges CRUD
    @Transactional(readOnly = true)
    public List<AdditionalChargeDto.Response> getAllAdditionalCharges() {
        return additionalChargeRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::mapAdditionalCharge)
                .collect(Collectors.toList());
    }

    public AdditionalChargeDto.Response createAdditionalCharge(AdditionalChargeDto.UpsertRequest request) {
        AdditionalCharge ac = new AdditionalCharge();
        ac.setTitle(request.getTitle());
        ac.setDescription(request.getDescription());
        ac.setChargeType(request.getChargeType());
        ac.setAmount(request.getAmount());
        ac.setDisplayOrder(request.getDisplayOrder());
        ac.setActive(request.isActive());
        return mapAdditionalCharge(additionalChargeRepository.save(ac));
    }

    public AdditionalChargeDto.Response updateAdditionalCharge(UUID id, AdditionalChargeDto.UpsertRequest request) {
        AdditionalCharge ac = additionalChargeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Additional charge not found: " + id));
        ac.setTitle(request.getTitle());
        ac.setDescription(request.getDescription());
        ac.setChargeType(request.getChargeType());
        ac.setAmount(request.getAmount());
        ac.setDisplayOrder(request.getDisplayOrder());
        ac.setActive(request.isActive());
        return mapAdditionalCharge(additionalChargeRepository.save(ac));
    }

    public void deleteAdditionalCharge(UUID id) {
        AdditionalCharge ac = additionalChargeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Additional charge not found: " + id));
        additionalChargeRepository.delete(ac);
    }

    // FAQs CRUD
    @Transactional(readOnly = true)
    public List<FaqDto.Response> getAllFaqs() {
        return faqRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::mapFaq)
                .collect(Collectors.toList());
    }

    public FaqDto.Response createFaq(FaqDto.UpsertRequest request) {
        Faq faq = new Faq();
        faq.setQuestion(request.getQuestion());
        faq.setAnswer(request.getAnswer());
        faq.setDisplayOrder(request.getDisplayOrder());
        faq.setActive(request.isActive());
        return mapFaq(faqRepository.save(faq));
    }

    public FaqDto.Response updateFaq(UUID id, FaqDto.UpsertRequest request) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found: " + id));
        faq.setQuestion(request.getQuestion());
        faq.setAnswer(request.getAnswer());
        faq.setDisplayOrder(request.getDisplayOrder());
        faq.setActive(request.isActive());
        return mapFaq(faqRepository.save(faq));
    }

    public void deleteFaq(UUID id) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found: " + id));
        faqRepository.delete(faq);
    }

    // Inquiries
    @Transactional(readOnly = true)
    public Page<InquiryDto.Response> getInquiries(int page, int size) {
        return inquiryRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size))
                .map(this::mapInquiry);
    }

    @Transactional(readOnly = true)
    public InquiryDto.Response getInquiryById(UUID id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found: " + id));
        return mapInquiry(inquiry);
    }

    public InquiryDto.Response updateInquiryStatus(UUID id, String status) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found: " + id));
        inquiry.setStatus(status);
        return mapInquiry(inquiryRepository.save(inquiry));
    }

    // Site Settings
    @Transactional(readOnly = true)
    public List<SiteSettingDto.Response> getAllSettings() {
        return siteSettingRepository.findAll().stream().map(s -> {
            SiteSettingDto.Response dto = new SiteSettingDto.Response();
            dto.setId(s.getId());
            dto.setSettingKey(s.getSettingKey());
            dto.setSettingValue(s.getSettingValue());
            dto.setUpdatedAt(s.getUpdatedAt());
            return dto;
        }).collect(Collectors.toList());
    }

    public SiteSettingDto.Response updateSetting(SiteSettingDto.UpsertRequest request) {
        SiteSetting setting = siteSettingRepository.findBySettingKey(request.getSettingKey())
                .orElse(new SiteSetting(request.getSettingKey(), request.getSettingValue()));
        setting.setSettingValue(request.getSettingValue());
        SiteSetting saved = siteSettingRepository.save(setting);
        SiteSettingDto.Response dto = new SiteSettingDto.Response();
        dto.setId(saved.getId());
        dto.setSettingKey(saved.getSettingKey());
        dto.setSettingValue(saved.getSettingValue());
        dto.setUpdatedAt(saved.getUpdatedAt());
        return dto;
    }

    public void changePassword(String email, AuthDto.ChangePasswordRequest request) {
        AdminUser user = adminUserRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Current password does not match");
        }
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        adminUserRepository.save(user);
    }

    private void updateProjectFields(Project project, ProjectDto.UpsertRequest request) {
        project.setTitle(request.getTitle());
        project.setSlug(request.getSlug());
        project.setCategory(request.getCategory());
        project.setShortDescription(request.getShortDescription());
        project.setFullDescription(request.getFullDescription());
        project.setProblemStatement(request.getProblemStatement());
        project.setSolution(request.getSolution());
        project.setTechnologies(request.getTechnologies());
        project.setCoverImageUrl(request.getCoverImageUrl());
        project.setDemoUrl(request.getDemoUrl());
        project.setGithubUrl(request.getGithubUrl());
        project.setProjectStatus(request.getProjectStatus());
        project.setFeatured(request.isFeatured());
        project.setPublished(request.isPublished());
        project.setDisplayOrder(request.getDisplayOrder());
    }

    private ProjectDto.Response mapProject(Project p) {
        ProjectDto.Response dto = new ProjectDto.Response();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setSlug(p.getSlug());
        dto.setCategory(p.getCategory());
        dto.setShortDescription(p.getShortDescription());
        dto.setFullDescription(p.getFullDescription());
        dto.setProblemStatement(p.getProblemStatement());
        dto.setSolution(p.getSolution());
        dto.setTechnologies(p.getTechnologies());
        dto.setCoverImageUrl(p.getCoverImageUrl());
        dto.setDemoUrl(p.getDemoUrl());
        dto.setGithubUrl(p.getGithubUrl());
        dto.setProjectStatus(p.getProjectStatus());
        dto.setFeatured(p.isFeatured());
        dto.setPublished(p.isPublished());
        dto.setDisplayOrder(p.getDisplayOrder());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setUpdatedAt(p.getUpdatedAt());
        return dto;
    }

    private ServiceDto.Response mapService(ServiceItem s) {
        ServiceDto.Response dto = new ServiceDto.Response();
        dto.setId(s.getId());
        dto.setTitle(s.getTitle());
        dto.setSlug(s.getSlug());
        dto.setDescription(s.getDescription());
        dto.setIcon(s.getIcon());
        dto.setFeatures(s.getFeatures());
        dto.setDisplayOrder(s.getDisplayOrder());
        dto.setActive(s.isActive());
        dto.setCreatedAt(s.getCreatedAt());
        return dto;
    }

    private PricingDto.Response mapPricing(PricingPlan p) {
        PricingDto.Response dto = new PricingDto.Response();
        dto.setId(p.getId());
        dto.setServiceType(p.getServiceType());
        dto.setTitle(p.getTitle());
        dto.setDevelopmentPrice(p.getDevelopmentPrice());
        dto.setAnnualHostingPrice(p.getAnnualHostingPrice());
        dto.setHostingRequired(p.isHostingRequired());
        dto.setFirstYearTotal(p.getFirstYearTotal());
        dto.setDescription(p.getDescription());
        dto.setFeatures(p.getFeatures());
        dto.setActive(p.isActive());
        return dto;
    }

    private AdditionalChargeDto.Response mapAdditionalCharge(AdditionalCharge a) {
        AdditionalChargeDto.Response dto = new AdditionalChargeDto.Response();
        dto.setId(a.getId());
        dto.setTitle(a.getTitle());
        dto.setDescription(a.getDescription());
        dto.setChargeType(a.getChargeType());
        dto.setAmount(a.getAmount());
        dto.setDisplayOrder(a.getDisplayOrder());
        dto.setActive(a.isActive());
        return dto;
    }

    private FaqDto.Response mapFaq(Faq f) {
        FaqDto.Response dto = new FaqDto.Response();
        dto.setId(f.getId());
        dto.setQuestion(f.getQuestion());
        dto.setAnswer(f.getAnswer());
        dto.setDisplayOrder(f.getDisplayOrder());
        dto.setActive(f.isActive());
        return dto;
    }

    private InquiryDto.Response mapInquiry(Inquiry i) {
        InquiryDto.Response dto = new InquiryDto.Response();
        dto.setId(i.getId());
        dto.setFullName(i.getFullName());
        dto.setEmail(i.getEmail());
        dto.setPhone(i.getPhone());
        dto.setProjectType(i.getProjectType());
        dto.setProjectName(i.getProjectName());
        dto.setBudgetRange(i.getBudgetRange());
        dto.setPreferredTimeline(i.getPreferredTimeline());
        dto.setDescription(i.getDescription());
        dto.setStatus(i.getStatus());
        dto.setConsentGiven(i.isConsentGiven());
        dto.setCreatedAt(i.getCreatedAt());
        return dto;
    }
}
