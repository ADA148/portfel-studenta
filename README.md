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

