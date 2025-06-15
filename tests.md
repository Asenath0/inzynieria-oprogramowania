## Scenariusze i przypadki testowe

### 1. Logowanie użytkownika

**Nazwa:** poprawność formularza logowania  
**Opis:** sprawdzenie porawności walidatorów pól, logowania i komunikatów błędów w formularzu logowania  
**Przebieg działań:**

| lp  | Działanie                                                                              | Efekt                                                                                               |
| --- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | Wypełnienie formularza przykładowymi danymi błędnymi i naciśnięcie przycisku ZALOGUJ   | System komunikuje błąd zgodny z tabelą danych                                                       |
| 2   | Wypełnienie formularza przykładowymi danymi poprawnymi i naciśnięcie przycisku ZALOGUJ | Następuje przekierowanie do poprzedniej odwiedzonej strony, na headerze wyświetla się imię "Tester" |

**Założenia:** Użytkownik jest niezalogowany, istnieje konto email: "hotelgo@hotelgo.com", hasło: "testhotelgo"  
**Dane testowe:**

| lp  | Dane pól formularza                                | Efekt                                                            |
| --- | -------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | email: ""; hasło: ""                               | błąd "Niewłaściwa nazwa użytkownika lub hasło. Spróbuj ponownie" |
| 2   | email: "hotelgo@hotelgo.com"; hasło: ""            | błąd "Niewłaściwa nazwa użytkownika lub hasło. Spróbuj ponownie" |
| 3   | email: ""; hasło: "testhotelgo"                    | błąd "Niewłaściwa nazwa użytkownika lub hasło. Spróbuj ponownie" |
| 4   | email: "hotelgo@hotelgo.com"; hasło: "testhotelgo" | sukces "Poprawnie zalogowano"                                    |

---

### 2. Rezerwacja pokoju

**Nazwa:** poprawność formularza rezerwacji  
**Opis:** sprawdzenie poprawności walidatorów pól danych osobowych oraz wymaganych zgód i komunikatów błędów  
**Przebieg działań:**

| lp  | Działanie                                                                                              | Efekt                                                                             |
| --- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 1   | Pozostawienie wszystkich pól danych osobowych i checkboxów pustych i kliknięcie „PRZEJDŹ DO PŁATNOŚCI” | System wyświetla komunikaty błędów: „To pole jest wymagane”                       |
| 2   | Poprawne dane + błędny email (np. „testmail@”) i kliknięcie „PRZEJDŹ DO PŁATNOŚCI”                     | Błąd: „Nieprawidłowy adres e-mail”                                                |
| 3   | Za krótkie imię/nazwisko, zły numer telefonu                                                           | Błędy: „Niepoprawne imię”, „Niepoprawne nazwisko”, „Nieprawidłowy numer telefonu” |
| 4   | Poprawne dane, jedna zgoda nie zaznaczona                                                              | Błąd pod niezaznaczonym polem: „To pole jest wymagane”                            |
| 5   | Poprawne dane, obie zgody zaznaczone                                                                   | Przejście do kolejnego kroku                                                      |

**Założenia:** Użytkownik wybrał ofertę pokoju, nie jest zalogowany  
**Dane testowe:**

| lp  | Dane pól formularza                                                                                         | Efekt                                                                             |
| --- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | imię: ""; nazwisko: ""; email: ""; telefon: ""; zgody: 0/2                                                  | błędy: „To pole jest wymagane”                                                    |
| 2   | imię: "Kacper"; nazwisko: "Kaźmierski"; email: "kacper@"; telefon: "123456789"; zgody: 1/2                  | błędy: „Nieprawidłowy adres e-mail”, „To pole jest wymagane”                      |
| 3   | imię: "K"; nazwisko: "K"; email: "k.k@sth.pl"; telefon: "123"; zgody: 2/2                                   | błędy: „Niepoprawne imię”, „Niepoprawne nazwisko”, „Nieprawidłowy numer telefonu” |
| 4   | imię: "Kacper"; nazwisko: "Kaźmierski"; email: "kacper.kazmierski@sth.pl"; telefon: "111222333"; zgody: 2/2 | sukces: Przejście do następnego kroku                                             |

---

### 4. Filtrowanie pokoi

**Nazwa:** poprawność formularza filtrowania pokoi  
**Opis:** sprawdzanie poprawności kalendarza, cennika, zliczania ceny  
**Przebieg działań:**

| lp  | Działanie                            | Efekt                                         |
| --- | ------------------------------------ | --------------------------------------------- |
| 1   | Kliknięcie WYNAJMIJ z pustymi danymi | System komunikuje błąd zgodny z tabelą danych |
| 2   | Poprawne dane + kliknięcie WYNAJMIJ  | Przejście do kolejnych kroków rezerwacji      |

**Dane testowe – daty:**

| lp  | Dane pól formularza                     | Efekt                                     |
| --- | --------------------------------------- | ----------------------------------------- |
| 1   | data pobytu: ""; data przeszła          | błąd "Niewłaściwe dane. Spróbuj ponownie" |
| 2   | data pobytu: niedostępna                | błąd "Niewłaściwe dane. Spróbuj ponownie" |
| 3   | data pobytu: poprawna (np. 15.07–18.07) | sukces: „Poprawne dane”                   |

**Dane testowe – liczba osób:**

| lp  | Dane pól formularza                        | Efekt                                     |
| --- | ------------------------------------------ | ----------------------------------------- |
| 1   | lista osób: ""; wartość ujemna             | błąd "Niewłaściwe dane. Spróbuj ponownie" |
| 2   | liczba osób niezgodna z wymaganiami pokoju | błąd "Niewłaściwe dane. Spróbuj ponownie" |
| 3   | liczba zgodna z danymi                     | sukces: „Poprawne dane”                   |
