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
       exited_users: 0,
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
      experiment_type: data.experiment_type,
      users: Map.size(data.participants),
      exited_users: data.exited_users
    }
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "changeType", "params" => type}) do
    data = %{data | experiment_type: type, started: false}
    action = %{
      type: "CHANGE_TYPE",
      experiment_type: data.experiment_type,
    }
    participant = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "start"}) do
    data = %{data | started: true, exited_users: 0}
    action = %{
      type: "START"
    }
    participant = dispatch_to_all(data.participants, action
                  |> Map.put(:users, Map.size(data.participants))
                  |> Map.put(:exited_users, data.exited_users)
    )
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "stop"}) do
    data = %{data | started: false}
    action = %{
      type: "STOP"
    }
    participant = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "exit", "params" => %{"time" => time} = params}, id) do
    # if the user haven't exited yet
    if data.participants[id] == nil do
      data = data
              |> put_in([:participants, id], params)
              |> Map.update!(:exited_users, &(&1 + 1))
      host_action = %{
        type: "UPDATE_USER",
        id: id, user: data.participants[id]
      }
      participant = dispatch_to_all(data.participants, %{
        type: "UPDATE_USERS",
        users: Map.size(data.participants),
        exited_users: data.exited_users
      })
      {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant}}
    end
    {:ok, %{"data" => data}}
  end

  def dispatch_to_all(participants, action) , do: Enum.map(participants, fn {id, _} ->
    {id, %{action: action}} end) |> Enum.into(%{})
end
