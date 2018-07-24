# clean
rm -rf elm/elm-stuff ps/.pulp-cache ps/output reason/src/*.js ts/src/*.js

# elm
cd elm

echo "--- start elm compile ---"
time elm-make --yes src/Main.elm
cd ..
echo "--- finish elm compile ---"
echo ""

# ps
cd ps

echo "--- start ps compile ---"
time pulp build
cd ..
echo "--- finish ps compile ---"
echo ""

# reason
cd reason

echo "--- start reason compile ---"
time bsb -make-world
cd ..
echo "--- finish reason compile ---"
echo ""

# ts
cd ts

echo "--- start ts compile ---"
time ./node_modules/typescript/bin/tsc src/index.ts
cd ..
echo "--- finish ts compile ---"
echo ""
