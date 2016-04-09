/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/canvas', 'util/localizetext','models/filtermodel' ],
	function ( browser, addPublishers , canvasHelper, loc, filtermodel ) {
		
		function ProcessModel () {
			if ( ! ( this instanceof ProcessModel ) ) {
				return new ProcessModel();
			}

			var self = this;
			var publishers = addPublishers( self, [ 'updateimage' ] );
			var ori = document.createElement('canvas');
			var context = ori.getContext('2d');
			

			function setimage(imageData){
				ori.width = imageData.width;
				ori.height = imageData.height;
				context.putImageData(imageData,0,0);

				publishers.updateimage.dispatch(imageData);
			}

			function filter(name){
				var canvas = document.createElement('canvas');
				canvas.width = ori.width;
				canvas.height = ori.height;
				var new_context = canvas.getContext('2d');
				new_context.drawImage(ori,0,0);
				var newdata=new_context.getImageData(0,0,canvas.width,canvas.height);

				switch(name){
					case 'filter1': 
						filtermodel.Grayscale(newdata);
						break;

				}

				publishers.updateimage.dispatch(newdata);
			}

			self.filter = filter;
			self.setimage = setimage;
			
		}
			

		return ProcessModel;
	}
);