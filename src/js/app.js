require('./settings');

var cards = [
  {
    title: 'The Quickness',
    description: 'The quick brown fox jumps over the lazy dog',
    tags: 'quick, brown, fox',
    icon: '<i class="far fa-calendar-plus"></i>'
  },
  {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet',
    tags: 'lorem, ipsum, dolor, sit, amet',
    icon: '<i class="fas fa-bicycle"></i>'
  },
  {
    title: 'Waltz',
    description: 'Waltz, bad nymph, for quick jigs vex',
    tags: 'vex',
    icon: '<i class="far fa-address-book"></i>'
  },
];

$(function() {
  var player = new Plyr('#my-player');

  loadCards();

  var index = elasticlunr(function() {
    this.addField('title');
    this.addField('description');
    this.addField('tags');
    this.setRef('id');
  });

  for (var i in cards) {
    index.addDoc({
      id: i,
      title: cards[i].title,
      description: cards[i].description,
      tags: cards[i].tags
    });
  }

  $('#search').on('propertychange input', function() {
    $('#search-results').html('');
    if (this.value.length > 0) {
      var results = index.search(this.value, {
        fields: {
          title: { boost: 3 },
          description: { boost: 2 },
          tags: { boost: 1 }
        },
        expand: true
      });

      if (results.length > 0) {
        for (var i in results) {
          var id = results[i].ref;
          $('#search-results').append('<div class="cell"><div class="card" data-equalizer-watch="results"><div class="card-section"><div class="grid-x grid-margin-x"><div class="cell small-4 text-center icon">'+cards[id].icon+'</div><div class="cell small-8"><h5>'+cards[id].title+'</h5><p>'+cards[id].description+'</p></div></div></div></div></div>');
        }

        var elem = new Foundation.Equalizer($('#search-results'), null);
      }
    } else {
      loadCards();
    }
  });
});

function loadCards() {
  var results = cards.slice();

  shuffle(results);

  for (var i in results) {
    $('#search-results').append('<div class="cell"><div class="card" data-equalizer-watch="results"><div class="card-section"><div class="grid-x grid-margin-x"><div class="cell small-4 text-center icon">'+results[i].icon+'</div><div class="cell small-8"><h5>'+results[i].title+'</h5><p>'+results[i].description+'</p></div></div></div></div></div>');
  }

  var elem = new Foundation.Equalizer($('#search-results'), null);
}