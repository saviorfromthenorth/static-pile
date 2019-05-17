require('./settings');

var card1 = {
  id: 1,
  title: 'The Quickness',
  description: 'The quick brown fox jumps over the lazy dog',
  tags: 'quick, brown, fox'
};

var card2 = {
  id: 2,
  title: 'Lorem Ipsum',
  description: 'Lorem ipsum dolor sit amet',
  tags: 'lorem, ipsum, dolor, sit, amet'
};


$(function() {
  var player = new Plyr('#my-player');

  var index = elasticlunr(function() {
    this.addField('title');
    this.addField('description');
    this.addField('tags');
    this.setRef('id');
  });

  index.addDoc(card1);
  index.addDoc(card2);

  $('#search').on('propertychange input', function() {
    if (this.value.length > 0) {
      var results = index.search(this.value, {
        fields: {
          title: { boost: 3 },
          description: { boost: 2 },
          tags: { boost: 1 }
        }
      });

      if (results.length > 0) {
        for (var i in results) {
          console.log(results[i].ref);
        }
      }
    }
  });
});