$(function() {
  $("#addCommForm").on("submit", function(e) {
    e.preventDefault();
    const name = $("#name").val();
    const comment = $("#comment").val();
    const articleId = $(".articleId").data("artid");

    fetch("/article/:comment", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        comment: comment,
        article: articleId,
        date: new Date()
      })
    })
      .then(res => {
        location.reload();
      })
      .catch(err => console.log(err));
  });

  $(".deleteComm").on("click", function() {
    const commentId = $(this).data("comment-delete");
    fetch("/article/:delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: commentId
      })
    }).then(res => {
      location.reload();
    });
  });

  $(".editComm").on("click", function() {
    const commentId = $(this).data("comment-edit");
    fetch("/article/:comment/:editComment", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: commentId
      })
    }).then(res => {
      const result = res.text();
      result.then(data => {
        parseData = JSON.parse(data);
        let htmlContent = `<div>
                              <form id="edit-addCommForm">
                                    <input type="text" id="edit-name" value=${
                                      parseData[0].name
                                    } required>
                                    <textarea cols="30" rows="4" id="edit-comment" required>${
                                      parseData[0].comment
                                    }</textarea>
                                    <button type="submit" data-edit-comment=${
                                      parseData[0]._id
                                    } id="edit-submitComment">Done</button>
                              </form>
                        </div>`;
        $(".oldComments").html(htmlContent);
        $("#edit-addCommForm").submit(commentEdited);
      });
    });
  });

  function commentEdited(e) {
    e.preventDefault();
    const name = $("#edit-name").val();
    const comment = $("#edit-comment").val();
    const articleId = $(".articleId").data("artid");
    const commentId = $("#edit-submitComment").data("edit-comment");

    fetch("/article/:edit", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        comment: comment,
        article: articleId,
        id: commentId,
        updatedOn: new Date()
      })
    })
      .then(res => {
        location.reload();
      })
      .catch(err => console.log(err));
  }
});
