
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
	var totalNosedowns = 0;
	var query = new Parse.Query("SetOfNosedowns");
	query.each(
		function(result) {
			totalNosedowns += result.get("count");
		}, 
		{
			success: function() {
				response.success(totalNosedowns);
			},
			error: function(error) {
				response.success(error);
			}
		}
	);
});

Parse.Cloud.define("generateLeaderboard", function(request, response) {
	var totalNosedowns = 0;
	var query = new Parse.Query("SetOfNosedowns");
	query.find().then(function(results) {
		for(var i=0; i<results.length; i++) {
		  totalNosedowns += results[i].get("count");
		}
		response.success(totalNosedowns);
	});
})

Parse.Cloud.afterSave("Comment", function(request) {
  query = new Parse.Query("Post");
  query.get(request.object.get("post").id, {
    success: function(post) {
      post.increment("comments");
      post.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});