<?php
require __DIR__ . '/../vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketServer implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $socketConn) {
        $this->clients->attach($socketConn);
        echo "New connection! ({$socketConn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $chatHistory = json_encode([
            ['sender' => 'User1', 'message' => 'Hello!'],
            ['sender' => 'User2', 'message' => 'Hi there!']
        ]);
    
        $from->send($chatHistory);
    
        foreach ($this->clients as $client) {
            if ($from !== $client) {
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $socketConn) {
        $this->clients->detach($socketConn);
        echo "Connection {$socketConn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $socketConn, \Exception $e) {
        echo "An error occurred: {$e->getMessage()}\n";
        $socketConn->close();
    }
}

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new WebSocketServer()
        )
    ),
    8080 // WebSocket server port
);

echo "Ang WebSocket server ay nagsimula sa port 8080\n";
$server->run();
