#include <iostream>

void sayHello(std::string name)
{
  std::string data = "Hello world, this is "+ name +"!";
  std::cout << data << std::endl;
}

int main(int argc, const char * argv[]) 
{
  std::string name = "World";
  if (argc > 1) 
  {
    name = argv[1];
  }
  sayHello(name);
}