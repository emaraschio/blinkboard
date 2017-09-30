module Api::V1
  class BlinksController < ApplicationController
    def index
      @blinks = Blink.order("created_at DESC")
      render json: @blinks
    end

    def create
      @blink = Blink.create(blink_params)
      render json: @blink
    end

    def update
      @blink = Blink.find(params[:id])
      @blink.update_attributes(blink_params)
      render json: @blink
    end

    def destroy
      @blink = Blink.find(params[:id])
      if @blink.destroy
        head :no_content, status: :ok
      else
        render json: @blink.errors, status: :unprocessable_entity
      end
    end

    private

    def blink_params
      params.require(:blink).permit(:title, :description)
    end
  end
end
