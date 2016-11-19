package com.kuzoncby.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by kuzoncby on 11/19/16.
 */
@RequestMapping("/")
public class HomeController {

    @RequestMapping("")
    public ModelAndView home() {
        return new ModelAndView("index");
    }

}