WsChatter.setup do |config|
  config.scope = :user
  config.status_column = :online
  config.messages_model = "Message"
end
