#!/bin/bash

# Arguments: Language, Code File, Input File, Time Limit, Memory Limit
LANG=$1
CODE_FILE=$2
INPUT_FILE=$3
OUTPUT_FILE="/judge/solution/output.txt"
ERROR_FILE="/judge/solution/error.txt"
MEM_USAGE_FILE="/judge/solution/mem_usage.txt"

# Limits
TIME_LIMIT=$4
MEMORY_LIMIT=$5
TIME_TAKEN=0

# Execution based on language
case "$LANG" in
    "cpp")
        g++ "$CODE_FILE" -o program 2> "$ERROR_FILE"
        if [ $? -ne 0 ]; then
            echo "Compilation Error" > "$OUTPUT_FILE"
            exit 1
        fi
        /usr/bin/time -f "%M" -o "$MEM_USAGE_FILE" timeout "$TIME_LIMIT"s ./program < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
	TIME_TAKEN=$?
        ;;
    "java")
        javac "$CODE_FILE" 2> "$ERROR_FILE"
        if [ $? -ne 0 ]; then
            echo "Compilation Error" > "$OUTPUT_FILE"
            exit 1
        fi
        /usr/bin/time -f "%M" -o "$MEM_USAGE_FILE" timeout "$TIME_LIMIT"s java ${CODE_FILE%.java} < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
	TIME_TAKEN=$?
        ;;
    "py")
        /usr/bin/time -f "%M" -o "$MEM_USAGE_FILE" timeout "$TIME_LIMIT"s python3 "$CODE_FILE" < "$INPUT_FILE" > "$OUTPUT_FILE" 2> "$ERROR_FILE"
	TIME_TAKEN=$?
        ;;
    *)
        echo "Unsupported Language" > "$OUTPUT_FILE"
        exit 1
        ;;
esac

# Get memory usage
MEM_USAGE=$(cat "$MEM_USAGE_FILE")

# Check for errors
if [ $TIME_TAKEN -eq 124 ] ; then
    #echo "TLE" > "$OUTPUT_FILE"
    exit 2
# Check if the output.txt file was created and is not empty
elif [ ! -s "$OUTPUT_FILE" ]; then
    echo "No output generated or empty output file." > "$OUTPUT_FILE"
    exit 1
elif grep -q "MemoryError" "$ERROR_FILE" || [ "$MEM_USAGE" -gt "$MEMORY_LIMIT" ]; then
    #echo "MLE" > "$OUTPUT_FILE"
    exit 3
elif [ -s "$ERROR_FILE" ]; then
    #echo "RE" > "$OUTPUT_FILE"
    exit 4
else
    #echo "Success" > "$OUTPUT_FILE"
    exit 0
fi