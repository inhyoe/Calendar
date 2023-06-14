const express = require('express');
const Comment = require('../models/comment')



const router = express.Router();
// コメントを表示するルーター
router.post('/:idx', async (req, res) => {
   const { idx } = req.params;
   try {
      //idx값에 따라 정렬
      let comment = await Comment.findAll(
         {
            where: {
               Notice_idx: idx
            },
            order: [["comment_idx", "DESC"]],
         }
      );

      res.send(comment);
   } catch (error) {
      res.send(error)
   }
}
)

// コメントを作成する時 
router.post('/create/:idx', async (req, res) => {
   const { idx } = req.params;
   let { sub_text, commenter, grade } = req.body
   console.log(req.body);
   try {
      let us = await Comment.create({
         Notice_idx: idx,
         sub_text,
         commenter,
         grade,
      })
      console.log(us)
      res.send(true)
   } catch (error) {
      console.log(error.message);
      res.send(false)
   }
})

// コメントの削除
router.delete('/delete/:idx', async (req, res) => {
   try {
      const { idx } = req.params;
      let { comment_idx, user_name } = req.body
      let rs = await Comment.destroy({
         where: { comment_idx, commenter: user_name }
      })
      let comment = await Comment.findAll({
         where: { Notice_idx: idx },
         order: [["comment_idx", "DESC"]],
      })
      if (rs === 0) {
         res.send({ comment, result: false })
      } else {
         res.send({ comment, result: true })
      }
   } catch (error) {
      console.log(error.message);
      res.send(false)
   }
})
module.exports = router;