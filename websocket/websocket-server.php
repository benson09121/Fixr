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
        
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        $data = json_decode($msg, true);
        if (isset($data['sender_id'], $data['message_text'], $data['conversation_id'])) {
            
            $stmt = $this->db->prepare("INSERT INTO tbl_messages (sender_id, message_text, conversation_id) VALUES (?, ?, ?)");
            $stmt->bind_param("isi", $data['sender_id'], $data['message_text'], $data['conversation_id']);
            $stmt->execute();
            $stmt->close();


            $stmt = $this->db->prepare("UPDATE tbl_conversations SET updated_at = NOW() WHERE conversation_id = ?");
            $stmt->bind_param("i", $data['conversation_id']);
            $stmt->execute();
            $stmt->close();

            
            foreach ($this->clients as $client) {
                if ($from !== $client) {
                    $client->send($msg);
                }
            }
        } elseif (isset($data['type']) && $data['type'] === 'getMessages' && isset($data['conversation_id'])) {
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
echo "Gusto ko na Humimlay Sir! Anyways, Server running on Port 8080\n";
$server->run();