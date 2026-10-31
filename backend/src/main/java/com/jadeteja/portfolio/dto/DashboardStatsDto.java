package com.jadeteja.portfolio.dto;

public class DashboardStatsDto {

    private long totalProjects;
    private long publishedProjects;
    private long totalInquiries;
    private long newInquiries;
    private long activeServices;

    public DashboardStatsDto() {
    }

    public DashboardStatsDto(long totalProjects, long publishedProjects, long totalInquiries, long newInquiries, long activeServices) {
        this.totalProjects = totalProjects;
        this.publishedProjects = publishedProjects;
        this.totalInquiries = totalInquiries;
        this.newInquiries = newInquiries;
        this.activeServices = activeServices;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getPublishedProjects() {
        return publishedProjects;
    }

    public void setPublishedProjects(long publishedProjects) {
        this.publishedProjects = publishedProjects;
    }

    public long getTotalInquiries() {
        return totalInquiries;
    }

    public void setTotalInquiries(long totalInquiries) {
        this.totalInquiries = totalInquiries;
    }

    public long getNewInquiries() {
        return newInquiries;
    }

    public void setNewInquiries(long newInquiries) {
        this.newInquiries = newInquiries;
    }

    public long getActiveServices() {
        return activeServices;
    }

    public void setActiveServices(long activeServices) {
        this.activeServices = activeServices;
    }
}
