#include <iostream>
#include <cmath>    // For trigonometric functions
#include <limits>   // For numeric_limits

using namespace std;

// Constant for PI
const double PI = 3.14159265358979323846;

// Convert degrees to radians
double degToRad(double degrees) {
    return degrees * PI / 180.0;
}

// Convert radians to degrees
double radToDeg(double radians) {
    return radians * 180.0 / PI;
}

// Clear invalid input from cin
void clearInput() {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

int main() {
    int choice, mode;
    double value, result;

    cout << "===== Trigonometric Calculator =====\n";
    cout << "Select mode:\n";
    cout << "1. Degrees\n";
    cout << "2. Radians\n";
    cout << "Enter choice: ";
    if (!(cin >> mode) || (mode != 1 && mode != 2)) {
        cout << "Invalid mode selection.\n";
        return 1;
    }

    cout << "\nSelect operation:\n";
    cout << "1. sin(x)\n";
    cout << "2. cos(x)\n";
    cout << "3. tan(x)\n";
    cout << "4. asin(x)\n";
    cout << "5. acos(x)\n";
    cout << "6. atan(x)\n";
    cout << "Enter choice: ";
    if (!(cin >> choice) || choice < 1 || choice > 6) {
        cout << "Invalid operation selection.\n";
        return 1;
    }

    cout << "\nEnter value: ";
    if (!(cin >> value)) {
        cout << "Invalid numeric input.\n";
        return 1;
    }

    // Perform calculation
    try {
        switch (choice) {
            case 1: // sin
                result = sin(mode == 1 ? degToRad(value) : value);
                break;
            case 2: // cos
                result = cos(mode == 1 ? degToRad(value) : value);
                break;
            case 3: // tan
                if (mode == 1 && fmod(value, 180.0) == 90.0) {
                    throw runtime_error("tan undefined at 90 + k*180 degrees");
                }
                result = tan(mode == 1 ? degToRad(value) : value);
                break;
            case 4: // asin
                if (value < -1.0 || value > 1.0) {
                    throw runtime_error("asin domain is [-1, 1]");
                }
                result = asin(value);
                if (mode == 1) result = radToDeg(result);
                break;
            case 5: // acos
                if (value < -1.0 || value > 1.0) {
                    throw runtime_error("acos domain is [-1, 1]");
                }
                result = acos(value);
                if (mode == 1) result = radToDeg(result);
                break;
            case 6: // atan
                result = atan(value);
                if (mode == 1) result = radToDeg(result);
                break;
        }

        cout << "\nResult: " << result << (mode == 1 && choice <= 3 ? " (unitless)" : (mode == 1 ? " degrees" : " radians")) << "\n";

    } catch (const exception &e) {
        cout << "Error: " << e.what() << "\n";
        return 1;
    }

    return 0;
}
