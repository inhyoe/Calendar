const express = require('express');
const Notice = require('../models/notice');
const sf = require('sf');

const router = express.Router();

router.post('/', async (req, res) => {
   // IDの検索 
   try {
      let notice = await Notice.findAll(
         {
            order: [["idx", "DESC"]],
            offset: 0
         }
      );
      // 取得したお知らせデータの日付形式を変換
      notice.map((a, i) => {
         let userTime = notice[i].dataValues.created_at.split(' ')[0]
         userTime = userTime.split('-')
         userTime = sf("{0}년 {1}월 {2}일", `${userTime[0]}`, `${userTime[1]}`, `${userTime[2]}`)
         notice[i].dataValues.created_at = userTime
      })
      // 変換後のデータをレスポンスとして送信
      res.send(notice);
   } catch (error) {
      res.send(error)
   }
}
)

router.post('/writepost', async (req, res) => {
   try {
      // リクエストから必要なデータを抽出
      let { NoticerId, user_name, title, main_text } = req.body;

      // Noticeモデルに新しいお知らせを作成
      let us = await Notice.create({
         title,
         main_text,
         NoticerId,
      })
      console.log(us)
      res.send(true)
   } catch (error) {
      console.log(error);
      res.send(false)
   }
})

router.post('/:idx', async (req, res) => {
   try {
      const { idx } = req.params;

      // 指定されたidxに該当するお知らせを取得
      let post = await Notice.findOne({
         where: { idx }
      })
      // 取得したお知らせデータの日付形式を変換
      let userTime = post.dataValues.created_at.split(' ')[0]
      userTime = userTime.split('-')
      userTime = sf("{0}년 {1}월 {2}일", `${userTime[0]}`, `${userTime[1]}`, `${userTime[2]}`)
      post.dataValues.created_at = userTime

      console.log("Post は", post);
      // 変換後のデータをレスポンスとして送信
      res.send(post)
   } catch (error) {
      console.log(error);
      res.send(error)
   }
})

router.post('/modifypost/:idx', async (req, res) => {
   try {
      const idx = req.params.idx
      console.log(idx);
      // 指定されたidxに該当するお知らせを取得
      let finded = await Notice.findAll({
         where: { idx }
      })
      console.log("Notice : ", finded);
      res.send(finded)
   } catch (error) {
      console.log(error);
      res.send(error.message)
   }
})

router.put('/modifypost/:idx', (req, res) => {
   try {
      const { idx } = req.params;
      let { NoticerId, title, main_text } = req.body;

      // 指定されたidxに該当するお知らせを更新
      Notice.update(
         { NoticerId, title, main_text },
         { where: { idx } }
      )
      res.send(true)
   } catch (error) {
      res.send(false)
   }
})


router.post('/delete/:idx', async (req, res) => {
   try {
      const { idx } = req.params;

      // 与えられたIDXに該当するお知らせを削除します。
      await Notice.destroy({
         where: { idx }
      })

      res.send(true)
   } catch (error) {
      console.log(error);
      res.send(false)
   }
})
module.exports = router;