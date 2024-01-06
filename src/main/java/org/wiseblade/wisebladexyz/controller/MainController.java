package org.wiseblade.wisebladexyz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
public class MainController {

    @GetMapping
    public RedirectView getMainPage(){
        return new RedirectView("home.html");
    }
}
