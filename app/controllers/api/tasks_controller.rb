class Api::TasksController < ApplicationController

  def index
    @team = Team.find(params[:team_id])
    @tasks = @team.tasks.all || []
    render :index
  end

  def create
    @task = Team.find(params[:team_id]).tasks.new(task_params)
    if @task.save
      render "api/tasks/show"
    else
      render json: { errors: @task.errors.full_messages }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :project_id,
                                 :assignee_id, :due_date, :completed)
  end

end
