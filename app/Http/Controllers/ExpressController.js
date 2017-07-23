'use strict'

const View = use('View')

class ExpressController {
 
  * render (request, response) {
      yield response.sendView('express')
  }

}

module.exports = ExpressController
