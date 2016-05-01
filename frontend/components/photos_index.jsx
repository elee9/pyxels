var React = require('react'),
    PhotoStore = require('../stores/photo_store'),
    ApiUtil = require('../util/api_util'),
    PhotoIndexItem = require('./photo_index_item'),
    Masonry = require('react-masonry-component');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      photos: PhotoStore.all()
    };
  },

  componentDidMount: function() {
    this.photoListener = PhotoStore.addListener(this._onChange);

    if (this.state.photos.length === 0){
      ApiUtil.fetchAllPhotos();
    }
  },

  componentWillUnmount: function() {
    this.photoListener.remove();
  },

  _onChange: function() {
    this.setState({ photos: PhotoStore.all() });
  },

  generatePhotoItems: function(){
		return this.state.photos.map(function(photo, key){
			return <PhotoIndexItem
								key={key}
								photo={photo}
								className="photo-index-item"/>;
    });
  },

  render: function(){
    var masonryOptions = {
      fitWidth: true,
      itemSelector: ".photo",
      gutter: 8,
      columnWidth: 12
    };

    return(
      <div className='indexWrapper'>
        <Masonry
          className='photoIndex'
          elementType={'ul'}
          options={masonryOptions}
          disableImageLoaded={true}>

          {this.generatePhotoItems()}
        </Masonry>
      </div>
    );
  }
});