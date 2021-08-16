input_file = open("C:/Users/francoa/Documents/SilvioCorsiAutunno/prova_django/ReadingFile/ReadingFile/myfile.txt", "r")

input_text = input_file.readlines()

output_text = []
for line in input_text:
    if line[-1] == "\n":
        output_text.append(line[:-1]) #all characters except the last one
    else:
        output_text.append(line)

print(output_text)