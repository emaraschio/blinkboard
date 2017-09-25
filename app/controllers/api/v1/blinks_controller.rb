module Api::V1
  class BlinksController < ApplicationController
    def index
      @blinks = Blink.all
      render json: @blinks
    end
  end
end
