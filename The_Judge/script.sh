#!/bin/bash

# Arguments: Language, Code File, Input File, Time Limit, Memory Limit
LANG=$1
CODE_FILE=$2
INPUT_FILE=$3
OUTPUT_FILE="/judge/solution/output.txt"
ERROR_FILE="/judge/solution/error.txt"
USAGE_FILE="/judge/solution/usage.txt"
MEM_FILE="/judge/solution/mem_usage.txt"
TIME_FILE="/judge/solution/time_usage.txt"

# Limits
TIME_LIMIT=$4
MEMORY_LIMIT=$5
TIME_TAKEN=0

# Execution based on language
case "$LANG" in
    "cpp")
        g++ "$CODE_FILE" -o program 2> "$ERROR_FILE"
        if [ $? -ne 0 ]; then
            echo "Compilation Error" > "$ERROR_FILE"
            exit 1
        fi
        /usr/bin/time -f "%M\n%e" -o "$USAGE_FILE" timeout "$TIME_LIMIT"s ./program < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
        TIME_TAKEN=$?
        ;;
    "java")
        javac "$CODE_FILE" 2> "$ERROR_FILE"
        if [ $? -ne 0 ]; then
            echo "Compilation Error" > "$ERROR_FILE"
            exit 1
        fi
        /usr/bin/time -f "%M\n%e" -o "$USAGE_FILE" timeout "$TIME_LIMIT"s java ${CODE_FILE%.java} < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
        TIME_TAKEN=$?
        ;;
    "py")
        /usr/bin/time -f "%M\n%e" -o "$USAGE_FILE" timeout "$TIME_LIMIT"s python3 "$CODE_FILE" < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
        TIME_TAKEN=$?
        ;;
    "js")
        /usr/bin/time -f "%M\n%e" -o "$USAGE_FILE" timeout "$TIME_LIMIT"s node "$CODE_FILE" < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
        TIME_TAKEN=$?
        ;;
    *)
        echo "Unsupported Language" > "$ERROR_FILE"
        exit 1
        ;;
esac

# Remove the first line if exit code is nonzero or 124 determine runtime error.
if [ "$TIME_TAKEN" -ne 0 ] && [ "$TIME_TAKEN" -ne 124 ]; then
    sed -i '1d' "$USAGE_FILE"
    echo "Runtime Error: Ex. divide by zero" > "$ERROR_FILE"
fi

# Extract memory and time usage
MEM_USED=$(sed -n '1p' "$USAGE_FILE")  # First line: memory usage
TIME_USED=$(sed -n '2p' "$USAGE_FILE")  # Second line: execution time in seconds
echo "$(echo $TIME_USED | awk '{print $1 * 1000}')" > "$TIME_FILE"
echo "$MEM_USED" > "$MEM_FILE"


# Check for errors
# 1. Is it time limit exceeded.
# 2. Is it compilation error (No output file will be generated or empty output file)

if [ "$TIME_TAKEN" = "timeout" ] || [ "$TIME_TAKEN" = "124" ]; then
    echo "Time Limit Exceeded" > "$ERROR_FILE"
    exit 2
elif grep -q "SyntaxError" "$ERROR_FILE"; then
    echo "Compilation Error" > "$ERROR_FILE"
    exit 1
elif [ -s "$ERROR_FILE" ]; then
    exit 4
elif grep -q "MemoryError" "$ERROR_FILE" || [ "$MEM_USAGE" -gt "$MEMORY_LIMIT" ]; then
    echo "Memory Limit Exceeded" > "$ERROR_FILE"
    exit 3
else
    exit 0
fi
