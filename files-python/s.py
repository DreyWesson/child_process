#Import library
import sys, getopt, time
def main(argv):
   argument = ''
   usage = 'usage: s.py -f <sometext>'
   # parse incoming arguments
   try:
      opts, args = getopt.getopt(argv,"hf:",["foo="])
   except getopt.GetoptError:
      print(usage)
      sys.exit(2)
   for opt, arg in opts:
      if opt == '-h':
         print(usage)
         sys.exit()
      elif opt in ("-f", "--foo"):
         argument = arg
   # print output
   print("Start : %s" % time.ctime())
   time.sleep( 2 )
   print('Foo is')
   time.sleep( 2 )
   print(argument)
   print("End : %s" % time.ctime())
if __name__ == "__main__":
   main(sys.argv[1:])
