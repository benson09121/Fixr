<?php
require  '../vendor/autoload.php';
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;
    protected $db;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->db = new mysqli('localhost', 'root', 'root', 'db_fixr'); // Update with your database credentials
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        $data = json_decode($msg, true);
        if (isset($data['sender_id'], $data['message_text'], $data['conversation_id'])) {
            // Store the message in the database
            $stmt = $this->db->prepare("INSERT INTO tbl_messages (sender_id, message_text, conversation_id) VALUES (?, ?, ?)");
            $stmt->bind_param("isi", $data['sender_id'], $data['message_text'], $data['conversation_id']);
            $stmt->execute();
            $stmt->close();

            // Broadcast the message to all clients except the sender
            foreach ($this->clients as $client) {
                if ($from !== $client) {
                    $client->send($msg);
                }
            }
        } elseif (isset($data['type']) && $data['type'] === 'getMessages' && isset($data['conversation_id'])) {
            // Fetch messages for the specified conversation
            $stmt = $this->db->prepare("SELECT * FROM tbl_messages WHERE conversation_id = ?");
            $stmt->bind_param("i", $data['conversation_id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $messages = $result->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            $response = [
                'type' => 'messages',
                'messages' => $messages
            ];
            $from->send(json_encode($response));
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

$server = \Ratchet\Server\IoServer::factory(
    new \Ratchet\Http\HttpServer(
        new \Ratchet\WebSocket\WsServer(
            new Chat()
        )
    ),
    8080
);
echo "Server started at ws://localhost:8080\n";
$server->run();