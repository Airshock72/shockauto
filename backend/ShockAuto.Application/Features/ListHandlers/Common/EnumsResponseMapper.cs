using System.Resources;

namespace ShockAuto.Application.Features.ListHandlers.Common;

public static class EnumsResponseMapper
{
    public static GetEnumsResponse[] From<TEnum>(ResourceManager resourceManager) where TEnum : struct, Enum
    {
        return Enum.GetValues<TEnum>()
            .Select(e => new GetEnumsResponse
                {
                    Id = Convert.ToInt32(e),
                    Key = e.ToString(),
                    Name = resourceManager.GetString(e.ToString()) ?? e.ToString()
                }).ToArray();
    }
}