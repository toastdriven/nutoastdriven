var Toast = function(options) {
  this.canvas_id = options.canvas_id
  this.divxel_size = 20
  this.initial_left = options.initial_left
  this.initial_top = options.initial_top
  this.image_url = options.image_url
  this.animate = options.animate || false

  this.canvas = document.getElementById(this.canvas_id)
  this.context = this.canvas.getContext('2d')
  this.image_data = null
  this.divxels = []
}

Toast.prototype.setup = function() {
  var self = this

  // Draw the image into the canvas.
  var img = new Image();
  $(img).on('load', function(ev) {
    self.context.drawImage(img, 0, 0)
    self.image_data = self.context.getImageData(0, 0, self.canvas.width, self.canvas.height)
    self.run()
  })
  $(img).attr('src', this.image_url)
}

Toast.prototype.create_divxel = function(rgba, x, y) {
  var divxel = $('<div id="divxel_' + x + '_' + y + '" class="pixel"></div>')
  divxel.css({
    'background-color': rgba
  , 'left': x * this.divxel_size + this.initial_left
  , 'top': y * this.divxel_size + this.initial_top
  })
  return divxel
}

Toast.prototype.create_toast = function() {
  this.divxels = []
  var height = this.canvas.height
  var width = this.canvas.width

  for(var y = 0; y < height; y++) {
    var px_data = y * width * 4
    this.divxels.push([])

    for(var x = 0; x < width; x++) {
      var red = this.image_data.data[px_data++]
      var green = this.image_data.data[px_data++]
      var blue = this.image_data.data[px_data++]
      var alpha = this.image_data.data[px_data++]
      var divxel = null

      if(alpha > 0) {
        // Include it if the pixel is NOT transparent.
        var rgba = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")"
        var divxel = this.create_divxel(rgba, x, y)
      }

      this.divxels[y].push(divxel)
    }
  }
}


Toast.prototype.reset_divxels = function() {
  for(var y = 0; y < this.divxels.length; y++) {
    for(var x = 0; x < this.divxels[y].length; x++) {
      if(this.divxels[y][x] === null) {
        continue
      }

      this.divxels[y][x].css('top', y * this.divxel_size + this.initial_top)
      this.divxels[y][x].show()
    }
  }
}

Toast.prototype.draw_toast = function() {
  for(var y = 0; y < this.divxels.length; y++) {
    for(var x = 0; x < this.divxels[y].length; x++) {
      if(this.divxels[y][x] === null) {
        continue
      }

      $('body').append(this.divxels[y][x])
    }
  }
}

Toast.prototype.fall_onto = function() {
  var self = this
  var timeout_modifier = 0

  for(var y = this.divxels.length - 1; y >= 0; y--) {
    for(var x = this.divxels[y].length - 1; x >= 0; x--) {
      if(this.divxels[y][x] === null) {
        continue
      }

      var timeout = timeout_modifier + parseInt(Math.random() * 500)
      this.divxels[y][x].delay(timeout).animate({
        top: '+=1100'
      }, {
        duration: 2000
      , easing: 'swing'
      })
    }
    timeout_modifier += 100
  }

  setTimeout(function() {
    self.fall_off()
  }, timeout + 5000)
}

Toast.prototype.fall_off = function() {
  var self = this
  var timeout = 0
  var browser_height = $(document).height()

  for(var y = this.divxels.length - 1; y >= 0; y--) {
    for(var x = this.divxels[y].length - 1; x >= 0; x--) {
      if(this.divxels[y][x] === null) {
        continue
      }

      this.divxels[y][x].delay(timeout).animate({
        top: '+=' + browser_height
      }, {
        duration: 500
      , easing: 'swing'
      , complete: function() {
          $(this).hide()
        }
      })
      timeout += Math.random() * 50
    }
  }

  setTimeout(function() {
    self.reset_divxels()
    self.fall_onto()
  }, timeout + 5000)
}

Toast.prototype.run = function() {
  this.create_toast()
  this.draw_toast()

  if(this.animate === true) {
    this.fall_onto()
  }
}
