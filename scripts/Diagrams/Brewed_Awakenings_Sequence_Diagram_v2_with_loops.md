sequenceDiagram
    participant U as User
    participant O as Orders.js
    participant DB as database.js
    participant DOM as DOM Update

    U->>O: Click on Order
    alt Order Details Not Generated
        O->>DB: Fetch Order Details
        DB->>O: Return Details
        loop For Each Order
            O->>DOM: Generate Details HTML for Order
            O->>O: Set Details Generated Flag to True for Order
        end
    else Order Details Generated
        O->>DOM: Toggle Details Visibility
    end
    DOM->>U: Display Order Details
