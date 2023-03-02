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
      .query(`SELECT * FROM plants WHERE CONTAINS (Name, N'${searchTerm}')`);
      console.log(searchTerm);
    return result.recordset;
  } catch (err) {
    console.error(err);
  }
  
}

router.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  const searchResults = await searchPlants(searchTerm);
  if (searchResults == undefined) {
    res.redirect('/');
  } else if (searchResults[0] == null) {
    res.send("No results were found!")
  }
  else {
    try {
      let tree = {
        id: searchResults[0]['ID'],
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
        name: req.user.username,
        status: true,
        number : searchResults.length
      };
      for(let i = 1; i < searchResults.length; i++ ){
        tree[`id${i}`] = searchResults[i]['ID'];
        tree[`ten${i}`]= searchResults[i]['Name'];
        tree[`dang_song${i}`]= searchResults[i]['Dạng sống'];
        tree[`cong_dung${i}`]= searchResults[i]['Công dụng'];
        tree[`sach_do${i}`]=  searchResults[i]['Sách đỏ'];
        tree[`ten_bo${i}`]= searchResults[i]['TÊN BỘ'];
        tree[`ten_bo1${i}`]= searchResults[i]['TÊN BỘ1'];
        tree[`ten_ho${i}`]= searchResults[i]['TÊN HỌ'];
        tree[`ten_chi${i}`] =searchResults[i]['TÊN CHI'];
        tree[`ten_chi1${i}`] =searchResults[i]['TÊN CHI1'];
        tree[`ten_loai${i}`] =searchResults[i]['TÊN LOÀI'];
        tree[`dong_danh${i}`]=searchResults[i]['Đồng danh'];
        tree[`dac_diem_hinh_thai${i}`]= searchResults[i]['Đặc điểm hình thái'];
        tree[`dac_diem_sinh_hoc${i}`] =searchResults[i]['Đặc điểm sinh học và hình thái học'];
        tree[`phan_bo_dia_ly${i}`] =searchResults[i]['Phân bố địa lý'];
        tree[`gia_tri${i}`] =searchResults[i]['Giá trị'];
        tree[`tinh_trang_bao_ton${i}`] =searchResults[i]['Tình trạng bảo tồn, kinh doanh'];
        tree[`tai_lieu_dan${i}`]= searchResults[i]['Tài liệu dẫn'];
        tree.i = i;
      }
      res.render('search-result', { tree: tree });
      
      console.log(req.query);

    } catch (error) {
      console.log(error);
      let tree = {
        id: searchResults[0]['ID'],
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
        name: "user",
        status: false,
        number : searchResults.length
      };
      for(let i = 1; i < searchResults.length; i++ ){
        tree[`id${i}`] = searchResults[i]['ID'];
        tree[`ten${i}`]= searchResults[i]['Name'];
        tree[`dang_song${i}`]= searchResults[i]['Dạng sống'];
        tree[`cong_dung${i}`]= searchResults[i]['Công dụng'];
        tree[`sach_do${i}`]=  searchResults[i]['Sách đỏ'];
        tree[`ten_bo${i}`]= searchResults[i]['TÊN BỘ'];
        tree[`ten_bo1${i}`]= searchResults[i]['TÊN BỘ1'];
        tree[`ten_ho${i}`]= searchResults[i]['TÊN HỌ'];
        tree[`ten_chi${i}`] =searchResults[i]['TÊN CHI'];
        tree[`ten_chi1${i}`] =searchResults[i]['TÊN CHI1'];
        tree[`ten_loai${i}`] =searchResults[i]['TÊN LOÀI'];
        tree[`dong_danh${i}`]=searchResults[i]['Đồng danh'];
        tree[`dac_diem_hinh_thai${i}`]= searchResults[i]['Đặc điểm hình thái'];
        tree[`dac_diem_sinh_hoc${i}`] =searchResults[i]['Đặc điểm sinh học và hình thái học'];
        tree[`phan_bo_dia_ly${i}`] =searchResults[i]['Phân bố địa lý'];
        tree[`gia_tri${i}`] =searchResults[i]['Giá trị'];
        tree[`tinh_trang_bao_ton${i}`] =searchResults[i]['Tình trạng bảo tồn, kinh doanh'];
        tree[`tai_lieu_dan${i}`]= searchResults[i]['Tài liệu dẫn'];
        tree.i = i;
      }
      res.render('search-result', { tree: tree });
    }
  }
});






module.exports = router;
