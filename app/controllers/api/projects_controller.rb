class Api::ProjectsController < ApplicationController

  def index
    @team = Team.find(params[:team_id])
    @projects = @team.projects
  end

  def create
    @project = Team.find(params[:team_id]).projects.new(project_params)
    if @project.save
      render :show
    else
      render json: { errors: @project.errors.full_messages }
    end
  end

  private

  def project_params
    params.require(:project).permit(:title)
  end

end
