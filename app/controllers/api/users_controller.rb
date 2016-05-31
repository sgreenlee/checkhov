class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/sessions/show"
    else
      render json: @user.errors.full_messages
    end
  end


  private

  def user_params
    params.require(:user)
      .permit(:email, :first_name, :last_name, :password)
  end

end
