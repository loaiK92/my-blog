$(function(){
      
      // $('#addArtForm').on('submit', function(e){
      //       e.preventDefault();
            
      //       const author = $('#author').val();
      //       const title = $('#title').val();
      //       const article = $('#article').val();
      //       const option = $('option:selected').val();
      //       const image = $('#upload-input').val();
      //       var formData = new FormData($(this)[0]);
      //       console.log(formData);
            
      //       fetch('/addArticle/create-form/submit', {
      //             method: 'post',
      //             headers: {
      //                   'Content-Type': 'multipart/form-data'
      //             },
      //             body: {
      //                   author: author,
      //                   title: title,
      //                   text: article,
      //                   image: $('#upload-input').val(),
      //                   date: new Date(),
      //                   category: [option]
      //             }
      //       })
      //       .then( res=> {
      //             // console.log('this is response ',res);
      //             location.href='/0';
      //       })
      //       .catch( err=> console.log(err) );
      // });

      $('#addCommForm').on('submit', function(e){
            e.preventDefault();
            const name = $('#name').val();
            const comment = $('#comment').val();
            const articleId = $('.articleId').data('artid');
            
            fetch('/article/:comment', {
                  method: 'post',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        name: name,
                        comment: comment,
                        article: articleId,
                        date: new Date()
                  })
            })
            .then(res=>{
                  location.reload();
            })
            .catch( err=> console.log(err) );
      });


      
      $('.deleteComm').on('click', function(){
            const commentId = $(this).data('comment-delete');
            // console.log(commentId);
            fetch('/article/:delete', {
                  method: 'delete',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        id: commentId
                  })
            })
            .then(res=>{
                  location.reload();
            });
      });


      $('.editComm').on('click', function(){
            const commentId = $(this).data('comment-edit');
            fetch("/article/:comment/:editComment", {
                  method: "post",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        data: commentId
                  })
            }).then(res=>{
                  const result = res.text();
                  result.then(data=>{
                        parseData = JSON.parse(data);
                        // console.log(parseData);
                        let htmlContent = `<div>
                              <form id="edit-addCommForm">
                                    <input type="text" id="edit-name" value=${parseData[0].name} required>
                                    <textarea cols="30" rows="4" id="edit-comment" required>${parseData[0].comment}</textarea>
                                    <button type="submit" data-edit-comment=${parseData[0]._id} id="edit-submitComment">Done</button>
                              </form>
                        </div>`;
                        $('.oldComments').html(htmlContent);
                        $('#edit-addCommForm').submit(commentEdited);
                  });
            });
      });

      function commentEdited(e){
            e.preventDefault();
            const name = $('#edit-name').val();
            const comment = $('#edit-comment').val();
            const articleId = $('.articleId').data('artid');
            const commentId = $('#edit-submitComment').data('edit-comment');

            fetch('/article/:edit', {
                  method: 'put',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        name: name,
                        comment: comment,
                        article: articleId,
                        id: commentId,
                        updatedOn: new Date()
                  })
            })
            .then(res=>{
                  location.reload();
            })
            .catch( err=> console.log(err) );
      }
});

            // $.ajax({
            //       url: "/article/:edit",
            //       type: "patch",
            //       dataType: "application/json",
            //       data: {
            //             id: commentId,
            //             articleId: articleId,
            //             name: name,
            //             comment: comment
            //       },
            //       success: function(result, status){
            //             console.log('result is : ',result, ' status is : ', status)
            //       }
            // });