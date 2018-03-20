var gulp=require('gulp');

var less=require('gulp-less');
const sprite=require('gulp.spritesmith');
gulp.task('default',function () {
	gulp.src('src/*.less')
		.pipe(less())
		.pipe(gulp.dest("dir"))	
})

gulp.task('hebing',function(){
	gulp.src('src/*.{jpg,png,gif}')
		.pipe(sprite({
			imgName:"sprite.png",//合并后的名称
			cssName:'sprite.css',//合并后的CSS路径
			padding:10,//图片间距
			algorithm:'binary-tree',//图片排列方式
            cssTemplate:function(data){             //如果是函数的话，这可以这样写
               var arr=[];
               data.sprites.forEach(function (sprite) {
                     arr.push(".icon-"+sprite.name+"{" 
                     	+"background-image: url('"+sprite.escaped_image+"');"
                     	+"background-position: "+sprite.px.offset_x+" "
                     	+sprite.px.offset_y+" ;"+"width:"+sprite.px.width+";"
                     	+"height:"+sprite.px.height+";"+"}\n");
                     });
                        return arr.join("");
            }
		}))
		.pipe(gulp.dest('dir'))
})