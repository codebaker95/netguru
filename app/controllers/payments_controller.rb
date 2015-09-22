class PaymentsController < ApplicationController
  expose(:payments) { Payment.includes(:student).by_time }
  expose(:payment, attributes: :payment_params)

  def create
    name = student.split(' ')
    student = Student.find_by(first_name: name[0], last_name: name[1])
    if !student
      flash[:alert] = "No such student in the database"
    else
      payment.student = student
      payment.save
    end
    redirect_to payments_url
  end

  private
    def payment_params
      params.require(:permit).permit(:student, :month, :year)
    end
end
