package com.ispan.buyallgoods.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.Categories;
import com.ispan.buyallgoods.service.CategoriesService;

@RestController
public class CategoriesController {

	@Autowired
	CategoriesService categoriesService;
	
	@GetMapping("/categories/findCategoriesIdByName/{name}" )
	public Map<String, Object> findCategoriesIdByName(@PathVariable(name = "name") String name) {
		Map<String, Object> responseJson = new HashMap<>();
		Integer findByCategoriesName = categoriesService.findCategoriesIdByName(name);
		responseJson.put("id", findByCategoriesName);
		return responseJson;
	}

	@PostMapping("/categories/{name}" )
	public Map<String, Object> checkExistsName(@PathVariable(name = "name") String name) {
		Map<String, Object> responseJson = new HashMap<>();

		boolean check = categoriesService.checkName(name);
		if (check) {
			responseJson.put("message", "資料已存在");
		} else {
			responseJson.put("message", "資料不存在");
		}

		return responseJson;
	}

	@GetMapping("/categories/{id}")
	public Categories getId(@PathVariable(value = "id") Integer id) {

		Categories categories = categoriesService.findById(id);
		if (categories != null) {
			return categories;
		}
		return null;
	}

	@GetMapping("/categories/findAll")
	public Map<String, Object> findAll(@RequestParam("current") int current,
            @RequestParam("rows") int rows) {
		
		//spring boot 分頁API
		Pageable pageable = PageRequest.of((current-1), rows);
		
		Page<Categories> pages = categoriesService.findAll(pageable);
		List<Categories> list = pages.getContent();
		long count = pages.getTotalElements();

		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("list", list);
		responseJson.put("count", count);

		return responseJson;
	}

	@PostMapping("/categories/insert")
	public Map<String, Object> insert(@RequestBody Categories categories) {

		Map<String, Object> responseJson = new HashMap<>();

		if (categoriesService.findByCategoriesName(categories)) {
			responseJson.put("message", "新增資料失敗");
			responseJson.put("success", false);
		} else {
			responseJson.put("message", "新增資料成功");
			responseJson.put("success", true);
		}
		return responseJson;
	}

	@PutMapping("/categories/update/{id}")
	public Map<String, Object> updateProduct(@PathVariable(value = "id") Integer id,
			@RequestBody Categories categories) {

		Map<String, Object> responseJson = new HashMap<>();
		if (categoriesService.updateById(id, categories) == null) {
			responseJson.put("message", "更新資料失敗");
			responseJson.put("success", false);
		} else {
			responseJson.put("message", "更新資料成功");
			responseJson.put("success", true);
		}
		return responseJson;

	}

	@DeleteMapping("/categories/delete/{id}")
	public Map<String, Object> deleteById(@PathVariable(value = "id") Integer id) {
		Map<String, Object> responseJson = new HashMap<>();
		if (categoriesService.findById(id) == null) {
			responseJson.put("msg", "資料不存在");
			responseJson.put("success", false);
		} else {
			if (categoriesService.deleteById(id)) {
				responseJson.put("msg", "刪除成功");
				responseJson.put("success", true);
			} else {
				responseJson.put("msg", "刪除失敗");
				responseJson.put("success", false);
			}
		}

		return responseJson;
	}

}
