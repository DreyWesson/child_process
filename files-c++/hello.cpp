#include <iostream>

void sayHello(std::string name)
{
  auto data = "hello, "+ name +"!";
  std::cout << data << std::endl;
}

int main(int argc, const char * argv[]) 
{
  auto name = "World";
  if (argc > 1) 
  {
    name = argv[1];
  }
  sayHello(name);
}