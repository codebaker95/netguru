class UsersController < ApplicationController
  before_action :authenticate_user!

  expose(:users) { User.connection.select_all("SELECT u.id, u.username, u.online, count(m.id) AS unread
    FROM users u LEFT JOIN messages m ON m.sender_id = u.id AND m.recipient_id = #{current_user.id} AND unread = true
    WHERE u.id != #{current_user.id}
    GROUP BY u.id ORDER BY u.last_sign_in_at") }

  respond_to :json

  def index
    render json: users.map {|user| {id: user["id"].to_i,
      username: user["username"],
      online: user["online"] == "t" ? true : false,
      unread: user["unread"].to_i}}
  end

  def messages
    user = User.find(params[:id])
    @messages = Message.between(current_user, user)
    render json: @messages.map {|message| {id: message.id,
      user_id: user.id,
      body: message.body,
      time: message.created_at,
      mine: message.sender_id == current_user.id}}
  end
end
