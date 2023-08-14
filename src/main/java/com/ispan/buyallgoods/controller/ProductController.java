package com.ispan.buyallgoods.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ispan.buyallgoods.model.Product;
import com.ispan.buyallgoods.service.ProductService;

@RestController
public class ProductController {

	@Autowired
	ProductService productService;

	@PostMapping("/product/findByCustomQuery")
	public Map<String, Object> findByCustomQuery(@RequestBody Product product) {
		Map<String, Object> responseJson = new HashMap<>();
		String name = product.getName();
		Integer suppliersId = product.getSuppliersId();
		Integer contractsId = product.getContractsId();

		if (name == null && suppliersId == null && contractsId == null) {
			responseJson.put("message", "資料不存在");
		} else {
			List<Product> list = productService.findByCustomQuery(name, suppliersId, contractsId);
			responseJson.put("list", list);
		}

		return responseJson;
	}

//	使用商品名稱尋找商品(模糊搜尋)	
	@PostMapping("/product/{name}")
	public Map<String, Object> checkName(@PathVariable(name = "name") String name) {
		Map<String, Object> responseJson = new HashMap<>();

		boolean check = productService.checkName(name);
		if (check) {
			responseJson.put("message", "資料已存在");
		} else {
			responseJson.put("message", "資料不存在");
		}

		return responseJson;
	}

//	使用商品名稱尋找商品(精確搜尋)	
	@PostMapping("/product/precise/{name}")
	public Map<String, Object> checkNamePrecise(@PathVariable(name = "name") String name) {
		Map<String, Object> responseJson = new HashMap<>();

		boolean check = productService.checkNamePrecise(name);
		if (check) {
			responseJson.put("message", "已有相同名稱商品");
		} else {
			responseJson.put("message", "沒有相同名稱商品");
		}

		return responseJson;
	}

	@GetMapping("/product/{productsId}")
	public Product getId(@PathVariable(value = "productsId") Integer id) {

		Product product = productService.findById(id);
		if (product != null) {
			return product;
		}
		return null;
	}

//	使用分類名稱尋找底下所有商品
	@GetMapping("/product/findByCategoriesName/{name}")
	public Map<String, Object> findProductsByCategoriesName(@PathVariable(value = "name") String name) {

		Map<String, Object> responseJson = new HashMap<>();
		List<Object[]> list = productService.findProductsByCategoriesName(name);
		responseJson.put("list", list);
		return responseJson;
	}

//	使用分類ID尋找底下所有商品
	@PostMapping("/product/findByCategoriesId/{id}")
	public Map<String, Object> findAllByCategoriesId(@PathVariable(value = "id") Integer id) {
		if (id == null) {
			return null;
		}

		Map<String, Object> responseJson = new HashMap<>();
		List<Product> list = productService.findAllByCategoriesId(id);
		responseJson.put("list", list);
		return responseJson;
	}
//	下面使用POJO測試
//	public ResponseEntity<List<ProductCategoriesPOJO>> findProductsByCategoriesName(
//			@PathVariable(value = "name") String name) {
//		List<Object[]> rawList = productService.findProductsByCategoriesName(name);
//		List<ProductCategoriesPOJO> productList = new ArrayList<>();
//
//		for (Object[] row : rawList) {
//			ProductCategoriesPOJO pojo = new ProductCategoriesPOJO();
//			pojo.setProductsId((Integer) row[0]);
//			pojo.setCategoriesId((Integer) row[1]);
//			pojo.setContractsId((Integer) row[2]);
//			pojo.setName((String) row[3]);
//			pojo.setProductsSpecification((String) row[4]);
//			pojo.setProductsDescription((String) row[5]);
//			pojo.setImagePath((String) row[6]);
//			pojo.setSellingPrice((Integer) row[7]);
//			pojo.setCost((Integer) row[8]);
//			pojo.setLowestPrice((Integer) row[9]);
//			pojo.setTotal((Integer) row[10]);
//			pojo.setOrderQuantity((Integer) row[11]);
//			pojo.setSoldQuantity((Integer) row[12]);
//			pojo.setSuppliersId((Integer) row[13]);
//			pojo.setExpiryDate(((java.sql.Date) row[14]).toLocalDate());
//			pojo.setSellingStartDate(((java.sql.Date) row[15]).toLocalDate());
//			pojo.setSellingStopDate(((java.sql.Date) row[16]).toLocalDate());
//			pojo.setDiscountStartDate(((java.sql.Date) row[17]).toLocalDate());
//			pojo.setDiscountEndDate(((java.sql.Date) row[18]).toLocalDate());
//			pojo.setDiscount(((BigDecimal) row[19]).doubleValue());
//			pojo.setStaffId((Integer) row[20]);
//			pojo.setCategoriesName((String) row[21]);
//
//			productList.add(pojo);
//		}
//		System.out.println("findByCategoriesName:" + productList.toString());
//		return ResponseEntity.ok(productList);
//	}

	@GetMapping("/product/findAll")
	public Map<String, Object> findAll(@RequestParam("current") int current, @RequestParam("rows") int rows) {

		// spring boot 分頁API
		Pageable pageable = PageRequest.of((current - 1), rows);

		Page<Product> pages = productService.findAll(pageable);
		List<Product> list = pages.getContent();
		long count = pages.getTotalElements();

		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("list", list);
		responseJson.put("count", count);
		System.out.println("findAll:" + responseJson.toString());

		return responseJson;
	}

	@GetMapping("/product/fullData")
	public Map<String, Object> fullData() {

		List<Product> list = productService.fullData();
		long count = productService.count();

		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("list", list);
		responseJson.put("count", count);

		return responseJson;
	}

	@PostMapping("/product/insert")
	public Map<String, Object> insert(@RequestBody Product product) {

		Map<String, Object> responseJson = new HashMap<>();

		if (productService.findByPreciseProductName(product)) {
			responseJson.put("message", "新增資料失敗");
			responseJson.put("success", false);
		} else {
			responseJson.put("message", "新增資料成功");
			responseJson.put("success", true);
		}
		return responseJson;
	}

//	@GetMapping("/product/findProductsBySupplierName/{suppliersName}")
//	public Map<String, Object> findProductsBySupplierName(@PathVariable(value = "suppliersName") String suppliersName) {
//
//		Map<String, Object> responseJson = new HashMap<>();
//		List<ProductDTO> list = productService.findProductsBySupplierName(suppliersName);
//		responseJson.put("list", list);
//		return responseJson;
//	}

//	@PostMapping("/product/findByCategoriesName")
//	public Map<String, Object> findProductsByCategoriesName(@RequestBody ProductCategoriesPOJO pcPOJO) {
//		
//		Map<String, Object> responseJson = new HashMap<>();
//		List<Object[]> list = productService.findProductsByCategoriesName(pcPOJO.getCategories().getName());
//		responseJson.put("list", list);
//		return responseJson;
//	}

	@GetMapping("/product/findByProductName/{name}")
	public Map<String, Object> findByProductName(@PathVariable(value = "name") String name) {

		Map<String, Object> responseJson = new HashMap<>();
		List<Product> list = productService.findByProductName(name);
		responseJson.put("list", list);
		return responseJson;
	}

	@PutMapping("/product/update/{id}")
	public Map<String, Object> updateProduct(@PathVariable(value = "id") Integer id, @RequestBody Product product) {

		System.out.println("id =" + id);
		System.out.println("product =" + product.toString());
		Map<String, Object> responseJson = new HashMap<>();
		if (productService.updateById(id, product) == null) {
			responseJson.put("message", "更新資料失敗");
			responseJson.put("success", false);
		} else {
			responseJson.put("message", "更新資料成功");
			responseJson.put("success", true);
		}
		return responseJson;

	}

	@PostMapping("/product/single-file")
	public Map<String, Object> singleFile(@RequestParam("file") MultipartFile file, @RequestParam("desc") String desc,
			@RequestParam("name") String name) {
		Map<String, Object> responseJson = new HashMap<>();

//		先確認是否有相同名稱商品
		boolean check = productService.checkNamePrecise(name);
		if (check) {
			responseJson.put("message", "商品名稱不可重複");
			responseJson.put("success", false);
			return responseJson;
		}

//		先確認是否有上傳檔案
		if (file == null || file.isEmpty()) {
			responseJson.put("message", "圖片不存在");
			responseJson.put("success", false);

		} else {
			try {
				byte[] bytes = file.getBytes(); // 檔案內容
//				String name = file.getOriginalFilename(); // 檔案名稱 (現在改用前端輸入的商品名稱取名)
//				String type = file.getContentType(); // 檔案類型
//				long size = file.getSize(); // 檔案大小

				String path2 = new File("").getAbsolutePath();

				// 指定本機存儲路徑
				String uploadPath = path2 + "\\src\\main\\resources\\static\\pic\\product\\" + name + ".jpg";
//
//	            // 寫入圖片到指定路徑
				Path path = Paths.get(uploadPath);
				Files.write(path, bytes);

//				System.out.println("name=" + name);
//				System.out.println("type=" + type);
//				System.out.println("size=" + size);
//				System.out.println("desc=" + desc);

				responseJson.put("message", "檔案上傳成功");
				responseJson.put("success", true);
				responseJson.put("imagePath", "/pic/" + name + ".jpg");
			} catch (Exception e) {
				responseJson.put("message", "檔案上傳失敗");
				responseJson.put("success", false);
			}
		}
		return responseJson;
	}

	@PostMapping("/product/single-file-update")
	public Map<String, Object> singleFileUpdate(@RequestParam("file") MultipartFile file,
			@RequestParam("desc") String desc, @RequestParam("name") String name) {
		Map<String, Object> responseJson = new HashMap<>();

//		先確認是否有上傳檔案
		if (file == null || file.isEmpty()) {
			responseJson.put("message", "圖片不存在");
			responseJson.put("success", false);

		} else {
			try {
				byte[] bytes = file.getBytes(); // 檔案內容

				String path2 = new File("").getAbsolutePath();

				// 指定本機存儲路徑
				String uploadPath = path2 + "\\src\\main\\resources\\static\\pic\\product\\" + name + ".jpg";
//
//	            // 寫入圖片到指定路徑
				Path path = Paths.get(uploadPath);
				Files.write(path, bytes);
				responseJson.put("message", "檔案上傳成功");
				responseJson.put("success", true);
				responseJson.put("imagePath", "/pic/" + name + ".jpg");
			} catch (Exception e) {
				responseJson.put("message", "檔案上傳失敗");
				responseJson.put("success", false);
			}
		}
		System.out.println(responseJson.toString());
		return responseJson;
	}
//	@DeleteMapping("/product/delete/{id}")
//	public Map<String, Object> deleteById(@PathVariable(value = "id") Integer id) {
//		Map<String, Object> responseJson = new HashMap<>();
//		if (productService.findById(id) == null) {
//			responseJson.put("msg", "資料不存在");
//			responseJson.put("success", false);
//		} else {
//			if (productService.deleteById(id)) {
//				responseJson.put("msg", "刪除成功");
//				responseJson.put("success", true);
//			} else {
//				responseJson.put("msg", "刪除失敗");
//				responseJson.put("success", false);
//			}
//		}
//
//		return responseJson;
//	}

}
