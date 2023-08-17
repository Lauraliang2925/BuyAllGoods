package com.ispan.buyallgoods.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ispan.buyallgoods.model.Categories;
import com.ispan.buyallgoods.model.Product;
import com.ispan.buyallgoods.repository.CategoriesRepository;

@Service
@Transactional(rollbackFor = { Exception.class })
public class CategoriesService {

	@Autowired
	CategoriesRepository categoriesRepository;

	
	public Categories findById(Integer id) {
		Optional<Categories> optional = categoriesRepository.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;

	}
	
	public List<Categories> fullData() {
		return categoriesRepository.findAll();

	}

	public Page<Categories> findAll(Pageable pageable) {
		return categoriesRepository.findAll(pageable);
	}

	public long count() {
		return categoriesRepository.count();
	}

	public Categories insertCategories(Categories categories) {
		if (categories.getName() != null) {
			return categoriesRepository.save(categories);
		}
		return null;
	}

	public Categories updateById(Integer id, Categories categories) {
		Optional<Categories> optional = categoriesRepository.findById(id);
		Categories sameCategories = categoriesRepository.findByCategoriesName(categories.getName());
		if (optional.isPresent() && sameCategories == null) {

			return categoriesRepository.save(categories);
		} else {
			return null;
		}
	}

	public boolean deleteById(Integer id) {

		Optional<Categories> optional = categoriesRepository.findById(id);
		if (optional.isPresent()) {
			categoriesRepository.deleteById(id);
			return true;
		}
		return false;
	}

	// 檢查是否有相同名稱的商品分類
	public boolean findByCategoriesName(Categories categories) {
		String name = categories.getName().strip();
		if (name.length() == 0 || name == null) {
			return true;
		}

		if (categoriesRepository.findByCategoriesName(categories.getName()) != null) {
			return true;
		}
		categoriesRepository.save(categories);
		return false;
	}
	
	
	// 使用商品分類名稱查ID
	public Integer findCategoriesIdByName(String name) {
		if (name.length() == 0 || name == null) {
			return null;
		}
		Integer idByName = categoriesRepository.findCategoriesIdByName(name);		
		return idByName;
	}

	public boolean checkName(String name) {
		if (categoriesRepository.findByCategoriesName(name) != null) {
			return true;
		}
		return false;
	}

}
