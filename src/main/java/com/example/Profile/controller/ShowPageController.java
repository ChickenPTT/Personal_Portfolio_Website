package com.example.Profile.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ShowPageController {

    @GetMapping({"/", "/index"})
    public String home() {
        return "index";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/detail-profile")
    public String legacyAbout() {
        return "redirect:/about";
    }

    @GetMapping("/projects")
    public String projects() {
        return "projects";
    }

    @GetMapping("/project-detail")
    public String projectDetail() {
        return "project_Detail";
    }

    @GetMapping("/expertise")
    public String expertise() {
        return "expertise";
    }

    @GetMapping("/gear")
    public String gear() {
        return "gear";
    }
}
