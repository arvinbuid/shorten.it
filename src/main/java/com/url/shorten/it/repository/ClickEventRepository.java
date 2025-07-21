package com.url.shorten.it.repository;

import com.url.shorten.it.models.ClickEvent;
import com.url.shorten.it.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {
    // Jpa will filter data based of url mapping and between startDate & endDate
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping urlMapping, LocalDateTime startDate, LocalDateTime endDate);
}