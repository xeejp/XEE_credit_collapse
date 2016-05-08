defmodule ChickenRace do
  use Xee.ThemeScript

  @experiment_types [
    "no_interaction",
    "no_interaction_and_information",
    "no_interaction_with_optimal",
    "interaction",
    "interaction_with_no_information"
  ]

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => %{
       started: false,
       experiment_type: "no_interaction",
       participants: %{},
       host_log: [],
       participant_log: []
     }}}
  end

  def join(%{participants: participants} = data, id) do
    if not Map.has_key?(participants, id) do
      participants = Map.put(participants, id, nil)
      data = %{data | participants: participants}
      IO.puts 1
      action = %{
        type: "ADD_USER",
        id: id,
        user: nil
      }
      {:ok, %{"data" => data, "host" => %{action: action}}}
    else
      IO.puts 2
      {:ok, %{"data" => data}}
    end
  end

  def handle_received(data, %{"action" => "fetchContents"}) do
    action = %{
      type: "UPDATE_CONTENTS",
      started: data.started,
      experiment_type: data.experiment_type,
      users: data.participants,
    }
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, %{"action" => "fetchContents"}, id) do
    action = %{
      type: "UPDATE_CONTENTS",
      started: data.started,
      answered: data.participants[id] != nil,
      experiment_type: data.experiment_type
    }
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "changeType", "params" => type}) do
    data = %{data | experiment_type: type, started: false}
    action = %{
      type: "CHANGE_TYPE",
      experiment_type: data.experiment_type,
    }
    {host, participant} = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => host, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "start"}) do
    data = %{data | started: true}
    action = %{
      type: "START"
    }
    {host, participant} = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => host, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "stop"}) do
    data = %{data | started: false}
    action = %{
      type: "STOP"
    }
    {host, participant} = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => host, "participant" => participant}}
  end

  def dispatch_to_all(participants, action), do: {
    %{action: action},
    Enum.map(participants, fn {id, _} -> {id, %{action: action}} end) |> Enum.into(%{})
  }
end
