package com.ispan.buyallgoods.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ispan.buyallgoods.model.Product;
import com.ispan.buyallgoods.model.ProductRepository;

@Service
@Transactional(rollbackFor = { Exception.class })
public class ProductService {
	@Autowired
	ProductRepository productRepository;

	public List<Object[]> findProductsByCategoriesName(String categoriesName) {
		return productRepository.findProductsByCategoriesName(categoriesName);

	}

	public List<Product> findByCustomQuery(String name, Integer suppliersId, Integer contractsId) {
		return productRepository.findByCustomQuery(name, suppliersId, contractsId);
	}

	public Page<Product> findAll(Pageable pageable) {
		return productRepository.findAll(pageable);

	}

	public List<Product> fullData() {
		return productRepository.findAll();

	}

	public long count() {
		return productRepository.count();
	}

//	public List<ProductDTO> findProductsBySupplierName(String suppliersName) {
//		List<ProductDTO> productDTOList = new ArrayList<>();
//		List<Object[]> productList = productRepository.findProductsBySupplierName(suppliersName);
//
//		for (Object[] obj : productList) {
//			ProductDTO productDTO = new ProductDTO();
//			productDTO.setProductsId((Integer) obj[0]);
//			productDTO.setName((String) obj[1]);
//			productDTO.setContractsId((Integer) obj[2]);
//			productDTO.setSuppliersId((Integer) obj[3]);
//			productDTOList.add(productDTO);
//		}
//
//		return productDTOList;
//	}
//    public List<ProductDTO> findProductsBySupplierName(String suppliersName) {
//        return productRepository.findProductsBySupplierName(suppliersName);
//    }

	public List<Product> findByProductName(String name) {
		return productRepository.findByProductName(name);
	}

	public Product findByPreciseProductName(String name) {
		return productRepository.findByPreciseProductName(name);
	}

	public Product findById(Integer id) {
		Optional<Product> optional = productRepository.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;

	}

//	使用分類ID尋找底下所有商品
	public List<Product> findAllByCategoriesId(Integer id) {
		List<Product> findAllByCategoriesId = productRepository.findAllByCategoriesId(id);

		if (findAllByCategoriesId != null) {
			return findAllByCategoriesId;
		}
		return null;

	}

	public Product insert(Product product) {
		if (product.getName() != null) {
			return productRepository.save(product);
		}
		return null;
	}

	public Product updateById(Integer id, Product product) {
		Optional<Product> optional = productRepository.findById(id);
		if (optional.isPresent()) {
			return productRepository.save(product);
		} else {
			return null;
		}
	}

	// 檢查是否有相同名稱的商品(模糊搜尋)
	public boolean findByProductName(Product product) {
		String name = product.getName().strip();
		if (name.length() == 0 || name == null) {
			return true;
		}

		if (productRepository.findByProductName(product.getName()) != null) {
			return true;
		}
		productRepository.save(product);
		return false;
	}

	// 檢查是否有相同名稱的商品(精確搜尋)
	public boolean findByPreciseProductName(Product product) {
		String name = product.getName().strip();
		if (name.length() == 0 || name == null) {
			return true;
		}

		if (productRepository.findByPreciseProductName(product.getName()) != null) {
			return true;
		}
		productRepository.save(product);
		return false;
	}

//	使用商品名稱尋找商品(模糊搜尋)	
	public boolean checkName(String name) {
		if (productRepository.findByProductName(name) != null) {
			return true;
		}
		return false;
	}

//	使用商品名稱尋找商品(精確搜尋)	
	public boolean checkNamePrecise(String name) {
		if (productRepository.findByPreciseProductName(name) != null) {
			return true;
		}
		return false;
	}

//	public String deleteById(Integer id) {
//
//		Optional<Product> optional = productRepository.findById(id);
//		if (optional.isPresent()) {
//			productRepository.deleteById(id);
//			return "刪除成功";
//		}
//		return "沒有這筆資料";
//	}
}
