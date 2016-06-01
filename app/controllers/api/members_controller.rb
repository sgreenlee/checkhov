class Api::MembersController < ApplicationController

    def index
      @members = current_user.teams.find(params[:team_id]).members.all
      render :index
    end

    def create
      @new_member = User.find_by(email: params[:member][:email])
      @team = current_user.teams.find(params[:team_id])
      @new_member.teams.push(@team)
      render :create
    end

    private

    def member_params
      params.require(:member).permit(:email)
    end
end
