#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
class Solution
{
public:
    int minimumPushes(string word)
    {
        vector<int> ltr(26, 0);
        for (int i = 0; i < word.length(); i++)
        {
            ltr[word[i] - 'a']++;
        }
        vector<pair<int, char>> pai;
        for (int i = 0; i < 26; i++)
        {
            if (ltr[i])
            {
                pai.push_back(make_pair(ltr[i], i + 'a'));
            }
        }
        auto comp = [](pair<int, char> a, pair<int, char> b)
        {
            return a.first < b.first;
        };
        sort(pai.begin(), pai.end(), comp);
        int count = 0;
        int btn = 2;
        int turn = 1;
        for (int i = 0; i < pai.size(); i++)
        {
            count = count + pai[i].first * turn;
            cout << endl
                 << "count :" << count << "char : " << pai[i].second;
            if (btn == 9)
            {
                btn = 2;
                turn++;
            }
            else
            {
                btn++;
            }
        }

        return count;
    }
};

int main()
{
    Solution a;
    cout << a.minimumPushes("aabbccddeeffgghhiiiiii");
}
