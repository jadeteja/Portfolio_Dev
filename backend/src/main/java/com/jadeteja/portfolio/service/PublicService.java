package com.jadeteja.portfolio.service;

import com.jadeteja.portfolio.dto.*;
import com.jadeteja.portfolio.entity.*;
import com.jadeteja.portfolio.exception.ResourceNotFoundException;
import com.jadeteja.portfolio.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PublicService {

    private final ProjectRepository projectRepository;
    private final ServiceRepository serviceRepository;
    private final PricingPlanRepository pricingPlanRepository;
    private final AdditionalChargeRepository additionalChargeRepository;
    private final FaqRepository faqRepository;
    private final InquiryRepository inquiryRepository;
    private final SiteSettingRepository siteSettingRepository;

    public PublicService(
            ProjectRepository projectRepository,
            ServiceRepository serviceRepository,
            PricingPlanRepository pricingPlanRepository,
            AdditionalChargeRepository additionalChargeRepository,
            FaqRepository faqRepository,
            InquiryRepository inquiryRepository,
            SiteSettingRepository siteSettingRepository) {
        this.projectRepository = projectRepository;
        this.serviceRepository = serviceRepository;
        this.pricingPlanRepository = pricingPlanRepository;
        this.additionalChargeRepository = additionalChargeRepository;
        this.faqRepository = faqRepository;
        this.inquiryRepository = inquiryRepository;
        this.siteSettingRepository = siteSettingRepository;
    }

    public List<ServiceDto.Response> getActiveServices() {
        return serviceRepository.findAllByActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapService)
                .collect(Collectors.toList());
    }

    public List<PricingDto.Response> getActivePricingPlans() {
        return pricingPlanRepository.findAllByActiveTrue().stream()
                .map(this::mapPricing)
                .collect(Collectors.toList());
    }

    public List<AdditionalChargeDto.Response> getActiveAdditionalCharges() {
        return additionalChargeRepository.findAllByActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapAdditionalCharge)
                .collect(Collectors.toList());
    }

    public List<ProjectDto.Response> getPublishedProjects(String category) {
        List<Project> list = (category != null && !category.isBlank())
                ? projectRepository.findPublishedByCategory(category)
                : projectRepository.findAllByPublishedTrueOrderByDisplayOrderAsc();

        return list.stream().map(this::mapProject).collect(Collectors.toList());
    }

    public ProjectDto.Response getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + slug));
        return mapProject(project);
    }

    public List<FaqDto.Response> getActiveFaqs() {
        return faqRepository.findAllByActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapFaq)
                .collect(Collectors.toList());
    }

    public SiteSettingDto.Response getSetting(String key) {
        SiteSetting setting = siteSettingRepository.findBySettingKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Setting not found for key: " + key));
        SiteSettingDto.Response dto = new SiteSettingDto.Response();
        dto.setId(setting.getId());
        dto.setSettingKey(setting.getSettingKey());
        dto.setSettingValue(setting.getSettingValue());
        dto.setUpdatedAt(setting.getUpdatedAt());
        return dto;
    }

    @Transactional
    public InquiryDto.Response submitInquiry(InquiryDto.CreateRequest request) {
        Inquiry inquiry = new Inquiry();
        inquiry.setFullName(request.getFullName().trim());
        inquiry.setEmail(request.getEmail().trim().toLowerCase());
        inquiry.setPhone(request.getPhone().trim());
        inquiry.setProjectType(request.getProjectType().trim());
        inquiry.setProjectName(request.getProjectName() != null ? request.getProjectName().trim() : null);
        inquiry.setBudgetRange(request.getBudgetRange());
        inquiry.setPreferredTimeline(request.getPreferredTimeline());
        inquiry.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        inquiry.setStatus("NEW");
        inquiry.setConsentGiven(Boolean.TRUE.equals(request.getConsentGiven()));

        Inquiry saved = inquiryRepository.save(inquiry);

        InquiryDto.Response response = new InquiryDto.Response();
        response.setId(saved.getId());
        response.setFullName(saved.getFullName());
        response.setEmail(saved.getEmail());
        response.setPhone(saved.getPhone());
        response.setProjectType(saved.getProjectType());
        response.setProjectName(saved.getProjectName());
        response.setBudgetRange(saved.getBudgetRange());
        response.setPreferredTimeline(saved.getPreferredTimeline());
        response.setDescription(saved.getDescription());
        response.setStatus(saved.getStatus());
        response.setConsentGiven(saved.isConsentGiven());
        response.setCreatedAt(saved.getCreatedAt());
        return response;
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

        if (p.getImages() != null) {
            dto.setImages(p.getImages().stream().map(img -> {
                ProjectDto.ProjectImageDto imgDto = new ProjectDto.ProjectImageDto();
                imgDto.setId(img.getId());
                imgDto.setImageUrl(img.getImageUrl());
                imgDto.setStoragePath(img.getStoragePath());
                imgDto.setAltText(img.getAltText());
                imgDto.setDisplayOrder(img.getDisplayOrder());
                return imgDto;
            }).collect(Collectors.toList()));
        }

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
}
