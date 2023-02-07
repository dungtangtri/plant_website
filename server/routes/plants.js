const express = require('express');
const router = express.Router();
const sql = require('mssql');
const ejs = require('ejs');
const connection = require('../db/connection').connection;

async function searchPlants(searchTerm) {
  try {
    await connection.connect();
    const result = await connection.request()
      .input('searchTerm', sql.NVarChar, searchTerm)
      .query('SELECT * FROM plants WHERE FREETEXT(Name, @searchTerm)');
    return result.recordset;
  } catch (err) {
    console.error(err);
  }
}

router.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  const searchResults = await searchPlants(searchTerm);
  if (searchResults == undefined) {
    res.send("Không tồn tại kết quả tìm kiếm");
  }
  else {
    try {
      let tree = {
        ten: searchResults[0]['Name'],
        dang_song: searchResults[0]['Dạng sống'],
        cong_dung: searchResults[0]['Công dụng'],
        sach_do: searchResults[0]['Sách đỏ'],
        ten_bo: searchResults[0]['TÊN BỘ'],
        ten_bo1: searchResults[0]['TÊN BỘ1'],
        ten_ho: searchResults[0]['TÊN HỌ'],
        ten_ho1: searchResults[0]['TÊN HỌ1'],
        ten_chi: searchResults[0]['TÊN CHI'],
        ten_chi1: searchResults[0]['TÊN CHI1'],
        ten_loai: searchResults[0]['TÊN LOÀI'],
        dong_danh: searchResults[0]['Đồng danh'],
        dac_diem_hinh_thai: searchResults[0]['Đặc điểm hình thái'],
        dac_diem_sinh_hoc: searchResults[0]['Đặc điểm sinh học và hình thái học'],
        phan_bo_dia_ly: searchResults[0]['Phân bố địa lý'],
        gia_tri: searchResults[0]['Giá trị'],
        tinh_trang_bao_ton: searchResults[0]['Tình trạng bảo tồn, kinh doanh'],
        tai_lieu_dan: searchResults[0]['Tài liệu dẫn'],
      };
      res.render('search-result', { tree: tree });
      console.log(req.query);
    } catch (error) {
      console.log(error);
      res.send("Error, please try again!");
    }
  }
});






module.exports = router;
