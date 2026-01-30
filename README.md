# portfel-studenta
Projekt został stworzony w celu ułatwienia kontroli nad domowym budżetem. Aplikacja pozwala na bieżąco monitorować wydatki, kategoryzować je oraz sprawdzać stopień wykorzystania założonego limitu finansowego. Całość opiera się na architekturze klient-serwer z wykorzystaniem bazy danych w chmurze.

Kluczowe funkcjonalności:
Zarządzanie wydatkami (CRUD): Pełna obsługa dodawania, wyświetlania, edycji oraz usuwania wpisów.
Dynamiczny budżet: Możliwość ustawienia miesięcznego limitu. Aplikacja oblicza pozostałe środki i wizualizuje postęp na pasku, który zmienia kolor po przekroczeniu budżetu.
Automatyczne rozpoznawanie kategorii: System przypisuje odpowiednie ikony (emotki) na podstawie słów kluczowych w tytule (np. paliwo, jedzenie, czynsz).
Filtrowanie czasowe: Wygodny wybór roku i miesiąca pozwala na szybką analizę wydatków historycznych.
Zapis preferencji: Wybrany limit budżetowy jest zapamiętywany w przeglądarce (localStorage).

Technologie
Frontend: React.js, Tailwind CSS, Axios.
Backend: Node.js, Express.js.
Baza danych: MongoDB Atlas.
Autoryzacja: Bezpieczeństwo zapytań zapewnione przez statyczny token API (Header Authorization).

Struktura plików
backend/server.js – konfiguracja serwera, modele danych MongoDB oraz trasy API.
frontend/src/App.js – główna logika interfejsu, zarządzanie stanem i filtrowanie.
frontend/src/api.js – odseparowana warstwa komunikacji z backendem.

Instrukcja uruchomienia
Backend
Przejdź do katalogu backend.
Uruchom serwer poleceniem: node server.js.
Poprawne połączenie zostanie potwierdzone komunikatem: Połączono z MongoDB!.

Frontend
Przejdź do katalogu frontend.
Uruchom aplikację poleceniem: npm start.
Projekt otworzy się automatycznie w przeglądarce pod adresem http://localhost:3000.

Podsumowanie techniczne
Aplikacja została zaprojektowana w sposób modułowy. Logika frontendu jest oddzielona od konfiguracji API, co ułatwia ewentualną rozbudowę. Zastosowanie Tailwind CSS pozwoliło na uzyskanie responsywnego i nowoczesnego wyglądu przy zachowaniu lekkości kodu.

<img width="1464" height="898" alt="image" src="https://github.com/user-attachments/assets/5e55880f-a3ed-4735-bc3d-082856f75b89" />
<img width="1471" height="885" alt="image" src="https://github.com/user-attachments/assets/5c74e9b9-b3b7-4f53-9e97-a503bc598aca" />
<img width="1467" height="902" alt="image" src="https://github.com/user-attachments/assets/5acf1db1-60de-4f7f-82e8-c504c7eb9417" />
<img width="1476" height="901" alt="image" src="https://github.com/user-attachments/assets/cf9da196-01b7-46ba-8164-313b30c88f10" />
