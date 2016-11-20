package com.kuzoncby.controller;

import com.kuzoncby.model.Bar;
import com.kuzoncby.model.Series;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kuzoncby on 11/19/16.
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping("")
    public ModelAndView home() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "json", method = RequestMethod.POST)
    public
    @ResponseBody
    Bar json() {
        Series series = new Series();
        series.setName("销量");
        series.setType("bar");
        List<Double> data = new ArrayList<>();
        for (int i = 0; i <= 5; i++) {
            data.add(100 * Math.random());
        }
        series.setData(data);
        List<String> legend = new ArrayList<>();
        legend.add("销量");
        List<String> xAxis = new ArrayList<>();
        xAxis.add("衬衫");
        xAxis.add("衬衫");
        xAxis.add("衬衫");
        xAxis.add("衬衫");
        xAxis.add("衬衫");
        return new Bar("ECharts 入门示例", legend, xAxis, series);
    }

}
